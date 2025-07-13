package com.example.spring_first_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication
public class SpringFirstProjectApplication {

	public static void main(String[] args) {

		SpringApplication.run(SpringFirstProjectApplication.class, args);
	}

}
