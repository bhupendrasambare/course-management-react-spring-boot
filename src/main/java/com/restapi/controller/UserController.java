package com.restapi.controller;

import com.restapi.entity.*;
import com.restapi.entity.enums.ERole;
import com.restapi.playload.defaultApiResponse.ApiResponse;
import com.restapi.playload.defaultApiResponse.StringLong;
import com.restapi.playload.mislenious.TopicDateGraph;
import com.restapi.playload.request.LoginRequest;
import com.restapi.playload.request.SignupRequest;
import com.restapi.playload.response.*;
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

    @Autowired
    TopicService topicService;

    @Autowired
    CompletedTopicService completedTopicService;

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
    @GetMapping("/get-order")
    public ApiResponse<?> getOrder(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        List<Order> orders = orderService.getOrderByUserId(user.getId());
        List<GetOrderResponse> result = new ArrayList<>();
        for(Order c:orders){
            result.add(new GetOrderResponse(c));
        }
        return new ApiResponse<>(HttpStatus.OK,"Courses To Cart",result,true);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/get-user-topic")
    public ApiResponse<?> getTopic(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        String id = request.getParameter("id");
        String courseId = request.getParameter("course");

        UserTopicResponse response = null;

        if(courseId != null && courseId != ""){
            Courses course= courseService.getCourseById(Long.valueOf(courseId));
            if(course == null){
                return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Nou Found",null,false);
            }
            if(orderService.courseExistsByUserId(user.getId(),course.getId())){
                List<Topic> topics = topicService.getTopicByCourseId(Long.valueOf(courseId));
                if(topics.size() <= 0){
                    return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Nou Found",null,false);
                }

                response = new UserTopicResponse(topics.get(0));
                if(topics.size() > 1){
                    response.setNextId(topics.get(1).getId());
                }
                if(topics.size() == 1){
                    response.setCompleted(true);
                }
                return new ApiResponse<>(HttpStatus.OK,"Courses Details",response,true);
            }else{
                return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Nou Found",null,false);
            }
        }

        if(id != null && id != ""){
            Topic topic= topicService.getTopicById(Long.valueOf(id));
            if(topic == null){
                return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Nou Found",null,false);
            }
            if(orderService.courseExistsByUserId(user.getId(),topic.getChapter().getCourses().getId())){

                response = new UserTopicResponse(topic);

                List<Topic> topicList = topicService.getTopicByCourseId(topic.getChapter().getCourses().getId());
                int check = 0;
                for(Topic t: topicList){
                    if(t.getId() == response.getId() && check == 0){
                        check = 1;
                        continue;
                    }
                    if(check == 1){
                        response.setNextId(t.getId());
                        check = 2;
                    }
                    if(check == 2){
                        break;
                    }
                }
                if(check == 1){
                    response.setCourseCompleted(true);
                }
                return new ApiResponse<>(HttpStatus.OK,"Courses Details",response,true);

            }else{
                return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Nou Found",null,false);
            }
        }


        return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Nou Found",null,false);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/mark-as-read")
    public ApiResponse<?> markAsRead(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        String topicId = request.getParameter("topic");
        if(topicId != null && topicId != ""){
            Topic topic = topicService.getTopicById(Long.valueOf(topicId));
            CompletedTopics completedTopics = new CompletedTopics();
            completedTopics.setTopic(topic);
            completedTopics.setUser(user);
            completedTopics.setDate(new Date());
            completedTopicService.saveCompletedTopics(completedTopics);

            return new ApiResponse<>(HttpStatus.OK,"Courses Details",true,true);
        }

        return new ApiResponse<>(HttpStatus.OK,"Topic Not Found",false,true);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/get-course-by-id")
    public ApiResponse<?> getCourseById(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        String id = request.getParameter("id");
        if(id == null || id == "" || id == "undefined"){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Nou Found",null,false);
        }

        Order order = orderService.getOrderByUserIdAndCourseId(user.getId(),Long.valueOf(id));
        if(order == null){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Course Nou Found",null,false);
        }
        CourseResponse result = new CourseResponse(order.getCourses());

        List<UserChapterResponse> chapterTopics = new ArrayList<>();
        List<Topic> topics = topicService.getTopicByCourseId(result.getId());
        List<Long> allChapters = new ArrayList<Long>();
        for(Topic a:topics){
            if(!allChapters.contains(a.getChapter().getId())){
                allChapters.add(a.getChapter().getId());
            }
        }
        List<CompletedTopics> completedTopic = completedTopicService.getCompletedTopicsByUserIdCourseId(user.getId(),result.getId());
        List<Long> addIds = new ArrayList<>();
        for(CompletedTopics c:completedTopic){
            addIds.add(c.getTopic().getId());
        }
        float count = 0,nums = 0;
        for(int i=0;i<allChapters.size();i++){
            UserChapterResponse temp = new UserChapterResponse();
            List<TopicResponse> topicsString = new ArrayList<>();
            String chapterName = "";
            for(Topic a:topics){
                if(a.getChapter().getId() == allChapters.get(i)) {
                    nums++;
                    chapterName = a.getChapter().getName();
                    TopicResponse topicResponse = new TopicResponse(a);
                    if(addIds.contains(topicResponse.getId())){
                        topicResponse.setIsCompleted(true);
                        count++;
                    }
                    topicsString.add(topicResponse);
                }
            }
            temp.setTopics(topicsString);
            temp.setChapter(chapterName);
            chapterTopics.add(temp);
        }

        UserGetCourseByIdResponse response = new UserGetCourseByIdResponse();
        response.setCourses(result);
        response.setChapterTopics(chapterTopics);
        System.out.println(count);
        System.out.println(nums);
        System.out.println(count/nums);
        response.setPercentage((count/nums) * 100);

        return new ApiResponse<>(HttpStatus.OK,"Courses Details",response,true);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/get-dashboard")
    public ApiResponse<?> getDashboard(HttpServletRequest request) {
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        UserDashboardResponse response = new UserDashboardResponse();
        List<CourseResponse> coursesList = new ArrayList<>();
        List<TopicResponse> topicList = new ArrayList<>();
        List<TopicDateGraph> graph = new ArrayList<>();

        List<Order> courses = orderService.getOrderByUserId(user.getId());
        List<CompletedTopics> completedTopics = completedTopicService.getCompletedTopicsByUserId(user.getId());

        for(CompletedTopics c: completedTopics){
            topicList.add(new TopicResponse(c.getTopic()));
            TopicDateGraph tDetails = new TopicDateGraph();
            tDetails.setTopic(new TopicResponse(c.getTopic()));
            tDetails.setDate(c.getDate());
            tDetails.setDateName(c.getDate().toString());
            graph.add(tDetails);
        }

        for(Order c: courses){
            coursesList.add(new CourseResponse(c.getCourses()));
        }

        response.setCountCourses(coursesList.size());
        response.setCountTopics(topicList.size());
        response.setCourses(coursesList);
        response.setTopics(topicList);



        return new ApiResponse<>(HttpStatus.OK,"account Details",response,true);
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/get-account")
    public ApiResponse<?> getAccount(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        UserAccountResponse response = new UserAccountResponse();

        response.setEmail(user.getEmail());
        response.setFirst(user.getName());
        response.setLast(user.getLast());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());

        List<StringLong> courses = new ArrayList<>();
        for(Order c:orderService.getOrderByUserId(user.getId())){
            courses.add(new StringLong(c.getCourses().getName(),c.getCourses().getId()));
        }

        response.setCourses(courses);

        return new ApiResponse<>(HttpStatus.OK,"User Details",response,true);
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
    @PostMapping("/save-order")
    public ApiResponse<?> placeOrder(HttpServletRequest request){
        String token = request.getParameter("auth");
        User user =  loginService.getUserFromJwtToken(token);

        List<Cart> carts = cartServices.getCartByUserId(user.getId());
        if(carts == null || carts.size()<1){
            return new ApiResponse<>(HttpStatus.NOT_ACCEPTABLE,"Empty Cart","",false);
        }
        for(Cart c:carts){
            Order order = new Order();
            order.setUser(user);
            order.setDate(new Date());
            order.setCourses(c.getCourses());
            orderService.saveOrder(order);
            cartServices.deleteCart(c.getId());
        }

        return new ApiResponse<>(HttpStatus.OK,"Your Order Has Been Placed","",true);
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
