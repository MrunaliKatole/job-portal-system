package com.jobportal.controllers;

import com.jobportal.entity.Users;
import com.jobportal.services.UsersService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class AuthController {


    private final UsersService usersService;


    public AuthController(
            UsersService usersService) {

        this.usersService =
                usersService;
    }


    // =====================================================
    // REGISTER
    // =====================================================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody Users user) {

        try {

            System.out.println(
                    "========================================"
            );

            System.out.println(
                    "REGISTER REQUEST RECEIVED"
            );

            System.out.println(
                    "Email: "
                            + user.getEmail()
            );

            System.out.println(
                    "Password received: "
                            + (
                            user.getPassword() != null &&
                            !user.getPassword().isBlank()
                    )
            );


            if (
                    user.getUserTypeId() != null
            ) {

                System.out.println(
                        "User Type ID: "
                                + user.getUserTypeId()
                                .getUserTypeId()
                );

            } else {

                System.out.println(
                        "User Type ID: NULL"
                );
            }


            System.out.println(
                    "========================================"
            );


            Users savedUser =
                    usersService.addNew(
                            user
                    );


            savedUser.setPassword(
                    null
            );


            return ResponseEntity
                    .status(
                            HttpStatus.CREATED
                    )
                    .body(
                            savedUser
                    );


        } catch (
                IllegalArgumentException e
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.BAD_REQUEST
                    )
                    .body(
                            e.getMessage()
                    );


        } catch (
                Exception e
        ) {

            e.printStackTrace();


            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Registration failed: "
                                    + e.getMessage()
                    );
        }
    }


    // =====================================================
    // LOGIN
    // =====================================================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody Users loginRequest) {

        try {

            Users user =
                    usersService.login(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    );


            // DO NOT SEND PASSWORD

            user.setPassword(
                    null
            );


            return ResponseEntity.ok(
                    user
            );


        } catch (
                IllegalArgumentException e
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.BAD_REQUEST
                    )
                    .body(
                            e.getMessage()
                    );


        } catch (
                RuntimeException e
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.UNAUTHORIZED
                    )
                    .body(
                            e.getMessage()
                    );
        }
    }


    // =====================================================
    // CURRENT USER
    // =====================================================

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {

        Users user =
                usersService
                        .getCurrentUser();


        if (
                user == null
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.UNAUTHORIZED
                    )
                    .body(
                            "Not logged in"
                    );
        }


        user.setPassword(
                null
        );


        return ResponseEntity.ok(
                user
        );
    }


    // =====================================================
    // DELETE JOB SEEKER ACCOUNT
    // =====================================================

    @DeleteMapping("/account/{userId}")
    public ResponseEntity<?> deleteAccount(
            @PathVariable Integer userId) {

        try {

            System.out.println(
                    "========================================"
            );

            System.out.println(
                    "DELETE ACCOUNT REQUEST"
            );

            System.out.println(
                    "User ID: "
                            + userId
            );

            System.out.println(
                    "========================================"
            );


            usersService.deleteAccount(
                    userId
            );


            return ResponseEntity.ok(
                    "Account deleted successfully"
            );


        } catch (
                IllegalArgumentException e
        ) {

            return ResponseEntity
                    .status(
                            HttpStatus.BAD_REQUEST
                    )
                    .body(
                            e.getMessage()
                    );


        } catch (
                RuntimeException e
        ) {

            e.printStackTrace();


            return ResponseEntity
                    .status(
                            HttpStatus.BAD_REQUEST
                    )
                    .body(
                            e.getMessage()
                    );


        } catch (
                Exception e
        ) {

            e.printStackTrace();


            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Unable to delete account: "
                                    + e.getMessage()
                    );
        }
    }
}