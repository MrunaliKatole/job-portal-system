package com.jobportal.services;

import com.jobportal.entity.Users;
import com.jobportal.repository.UsersRepository;
import com.jobportal.util.CustomUserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService
        implements UserDetailsService {

    private final UsersRepository usersRepository;


    @Autowired
    public CustomUserDetailsService(
            UsersRepository usersRepository) {

        this.usersRepository =
                usersRepository;
    }


    @Override
    public UserDetails loadUserByUsername(
            String username)
            throws UsernameNotFoundException {


        if (username == null ||
                username.isBlank()) {

            throw new UsernameNotFoundException(
                    "Email is required");
        }


        String email =
                username.trim()
                        .toLowerCase();


        Users user =
                usersRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new UsernameNotFoundException(
                                        "User not found: "
                                                + email));



        if (!user.isActive()) {

            throw new UsernameNotFoundException(
                    "User account is inactive");
        }


        return new CustomUserDetails(user);
    }
}