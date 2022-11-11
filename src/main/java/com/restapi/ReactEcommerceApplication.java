package com.restapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@SpringBootApplication
public class ReactEcommerceApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(ReactEcommerceApplication.class, args);
	}

}
