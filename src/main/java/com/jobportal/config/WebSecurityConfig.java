package com.jobportal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http
            .csrf(csrf -> csrf.disable())

            .cors(cors -> {
               
            })

            .authorizeHttpRequests(auth -> auth

                // AUTH
           

                .requestMatchers(
                    "/api/auth/**"
                ).permitAll()
                
                // JOB SEEKER
              

                .requestMatchers(
                    "/api/jobseeker/**"
                ).permitAll()

                // RECRUITER
                
                .requestMatchers(
                    "/api/recruiter/**"
                ).permitAll()

                // JOBS
                
                .requestMatchers(
                    "/api/jobs/**"
                ).permitAll()

                // SAVED JOBS
               

                .requestMatchers(
                    "/api/saved-jobs/**"
                ).permitAll()
               
                // APPLICATIONS
               

                .requestMatchers(
                    "/api/applications/**"
                ).permitAll()

                // OTHER REQUESTS
        

                .anyRequest().permitAll()
            );

        return http.build();
    }
}