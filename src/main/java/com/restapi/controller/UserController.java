package com.restapi.controller;

import com.restapi.entity.Cart;
import com.restapi.entity.Courses;
import com.restapi.entity.Role;
import com.restapi.entity.User;
import com.restapi.entity.enums.ERole;
import com.restapi.playload.defaultApiResponse.ApiResponse;
import com.restapi.playload.request.LoginRequest;
import com.restapi.playload.request.SignupRequest;
import com.restapi.playload.response.GetCartResponse;
import com.restapi.playload.response.JwtResponse;
import com.restapi.playload.response.MessageResponse;
import com.restapi.repository.OrderRepository;
import com.restapi.repository.RoleRepository;
import com.restapi.repository.UserRepository;
import com.restapi.security.jwt.JwtUtils;
import com.restapi.security.services.UserDetailsImpl;
import com.restapi.security.services.UserDetailsServiceImpl;
import com.restapi.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.net.http.HttpRequest;
import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    JwtUtils loginService;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    UserService userService;

    @Autowired
    CategoriesService categoriesService;

    @Autowired
    CourseService courseService;

    @Autowired
    CartServices cartServices;

    @Autowired
    OrderService orderService;

    //@PreAuthorize("hasAnyAuthority('USER')") --
    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/login-user")
    public String userRole(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        return user.getEmail();
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        boolean isUser = false;
        for(String e:roles){
            if(e.equals("USER")){
                isUser = true;
            }
        }
        if(isUser){
            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    null));
        }
        return null;
    }

    @GetMapping("/validate-email")
    public ApiResponse<?> getUsersList(HttpServletRequest request){
        String userName = request.getParameter("email");
        String email = request.getParameter("username");
        User user = userService.getUserByUserName(userName);
        User emailUser = userService.getUserByUserName(email);
        if(user != null || emailUser != null){
            String message = "Username Exists";
            if(emailUser == null){
                message = "Email Exists";
            }
            return new ApiResponse<>(HttpStatus.OK,message,message,false);
        }
        return new ApiResponse<>(HttpStatus.OK,"Username not exists","",true);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        Role userRole = roleRepository.findByName(ERole.USER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);

        user.setRoles(roles);
        user.setName(signUpRequest.getName());
        user.setLast(signUpRequest.getLast());
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/get-cart")
    public ApiResponse<?> getCart(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        List<Cart> carts = cartServices.getCartByUserId(user.getId());
        List<GetCartResponse> result = new ArrayList<>();
        for(Cart c:carts){
            result.add(new GetCartResponse(c));
        }

        return new ApiResponse<>(HttpStatus.OK,"Courses To Cart",result,true);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @PostMapping("/add-to-cart")
    public ApiResponse<?> addToCart(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        String courseId = request.getParameter("id");
        if(courseId == null || courseId == ""){
            return new ApiResponse<>(HttpStatus.OK,"Course not exists","",false);
        }
        Courses course = courseService.getCourseById(Long.valueOf(courseId));
        if(course == null){
            return new ApiResponse<>(HttpStatus.OK,"Course not exists","",false);
        }

        if(orderService.courseExistsByUserId(user.getId(),course.getId())){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Already Brought","",false);
        }

        if(cartServices.courseExistsByUserId(user.getId(),course.getId())){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Already In Cart","",false);
        }

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setCourses(course);
        cart.setIsDeleted(false);
        cart.setDate(new Date());
        cartServices.saveCart(cart);

        return new ApiResponse<>(HttpStatus.OK,"Course Added To Cart","",true);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @DeleteMapping("/delete-cart")
    public ApiResponse<?> deleteCart(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        String id = request.getParameter("id");
        if(id==null || id == ""){
            return new ApiResponse<>(HttpStatus.OK,"Something went wrong","",false);
        }
        cartServices.deleteCart(Long.valueOf(id));

        return new ApiResponse<>(HttpStatus.OK,"Course removed From Cart","",true);
    }

}
