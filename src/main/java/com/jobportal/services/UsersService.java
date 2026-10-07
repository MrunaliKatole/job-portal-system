package com.jobportal.services;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.entity.JobSeekerApply;
import com.jobportal.entity.JobSeekerProfile;
import com.jobportal.entity.JobSeekerSave;
import com.jobportal.entity.RecruiterProfile;
import com.jobportal.entity.Users;
import com.jobportal.entity.UsersType;

import com.jobportal.repository.JobSeekerApplyRepository;
import com.jobportal.repository.JobSeekerProfileRepository;
import com.jobportal.repository.JobSeekerSaveRepository;
import com.jobportal.repository.RecruiterProfileRepository;
import com.jobportal.repository.UsersRepository;
import com.jobportal.repository.UsersTypeRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Service
public class UsersService {

    private final UsersRepository usersRepository;

    private final UsersTypeRepository usersTypeRepository;

    private final JobSeekerProfileRepository jobSeekerProfileRepository;

    private final RecruiterProfileRepository recruiterProfileRepository;

    private final JobSeekerSaveRepository jobSeekerSaveRepository;

    private final JobSeekerApplyRepository jobSeekerApplyRepository;

    private final PasswordEncoder passwordEncoder;


    @PersistenceContext
    private EntityManager entityManager;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    @Autowired
    public UsersService(
            UsersRepository usersRepository,
            UsersTypeRepository usersTypeRepository,
            JobSeekerProfileRepository jobSeekerProfileRepository,
            RecruiterProfileRepository recruiterProfileRepository,
            JobSeekerSaveRepository jobSeekerSaveRepository,
            JobSeekerApplyRepository jobSeekerApplyRepository,
            PasswordEncoder passwordEncoder) {

        this.usersRepository =
                usersRepository;

        this.usersTypeRepository =
                usersTypeRepository;

        this.jobSeekerProfileRepository =
                jobSeekerProfileRepository;

        this.recruiterProfileRepository =
                recruiterProfileRepository;

        this.jobSeekerSaveRepository =
                jobSeekerSaveRepository;

        this.jobSeekerApplyRepository =
                jobSeekerApplyRepository;

        this.passwordEncoder =
                passwordEncoder;
    }


    // =====================================================
    // REGISTER
    // =====================================================

    @Transactional
    public Users addNew(Users user) {

        if (user == null) {

            throw new IllegalArgumentException(
                    "User data cannot be null"
            );
        }


        if (
                user.getEmail() == null ||
                user.getEmail().isBlank()
        ) {

            throw new IllegalArgumentException(
                    "Email is required"
            );
        }


        if (
                user.getPassword() == null ||
                user.getPassword().isBlank()
        ) {

            throw new IllegalArgumentException(
                    "Password is required"
            );
        }


        String email =
                user.getEmail()
                        .trim()
                        .toLowerCase();


        if (
                usersRepository
                        .findByEmail(email)
                        .isPresent()
        ) {

            throw new IllegalArgumentException(
                    "Email already registered"
            );
        }


        user.setEmail(email);


        // =================================================
        // USER TYPE
        // 1 = RECRUITER
        // 2 = JOB SEEKER
        // =================================================

        Integer typeId = 2;


        if (
                user.getUserTypeId() != null
        ) {

            Integer incomingTypeId =
                    user.getUserTypeId()
                            .getUserTypeId();


            if (
                    incomingTypeId != null
            ) {

                typeId =
                        incomingTypeId;
            }
        }


        if (
                !Integer.valueOf(1)
                        .equals(typeId)
                &&
                !Integer.valueOf(2)
                        .equals(typeId)
        ) {

            throw new IllegalArgumentException(
                    "Invalid user type. 1 = Recruiter, 2 = Job Seeker"
            );
        }


        final Integer finalTypeId =
                typeId;


        UsersType userType =
                usersTypeRepository
                        .findById(finalTypeId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User Type not found: "
                                                + finalTypeId
                                )
                        );


        user.setUserTypeId(
                userType
        );


        user.setPassword(
                passwordEncoder.encode(
                        user.getPassword()
                )
        );


        user.setActive(
                true
        );


        user.setRegistrationDate(
                LocalDate.now()
        );


        // =================================================
        // SAVE USER
        // =================================================

        Users savedUser =
                usersRepository
                        .saveAndFlush(user);


        // =================================================
        // CREATE PROFILE
        // =================================================

        if (
                Integer.valueOf(1)
                        .equals(typeId)
        ) {

            // RECRUITER

            RecruiterProfile profile =
                    new RecruiterProfile();


            profile.setUserAccountId(
                    savedUser.getUserId()
            );


            profile.setUserId(
                    savedUser
            );


            entityManager.persist(
                    profile
            );

        } else {

            // JOB SEEKER

            JobSeekerProfile profile =
                    new JobSeekerProfile();


            profile.setUserAccountId(
                    savedUser.getUserId()
            );


            profile.setUserId(
                    savedUser
            );


            entityManager.persist(
                    profile
            );
        }


        entityManager.flush();


        return savedUser;
    }


    // =====================================================
    // LOGIN
    // =====================================================

    public Users login(
            String email,
            String password) {

        if (
                email == null ||
                email.isBlank() ||
                password == null ||
                password.isBlank()
        ) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }


        String normalizedEmail =
                email.trim()
                        .toLowerCase();


        Users user =
                usersRepository
                        .findByEmail(
                                normalizedEmail
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Invalid email or password"
                                )
                        );


        if (
                !passwordEncoder.matches(
                        password,
                        user.getPassword()
                )
        ) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }


        if (
                Boolean.FALSE.equals(
                        user.getActive()
                )
        ) {

            throw new RuntimeException(
                    "Account is inactive"
            );
        }


        return user;
    }


    // =====================================================
    // CURRENT USER
    // =====================================================

    public Users getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();


        if (
                authentication == null ||
                !authentication.isAuthenticated() ||
                "anonymousUser"
                        .equals(
                                authentication
                                        .getPrincipal()
                        )
        ) {

            return null;
        }


        return usersRepository
                .findByEmail(
                        authentication
                                .getName()
                                .trim()
                                .toLowerCase()
                )
                .orElse(null);
    }


    // =====================================================
    // CURRENT USER PROFILE
    // =====================================================

    public Object getCurrentUserProfile() {

        Users user =
                getCurrentUser();


        if (
                user == null ||
                user.getUserTypeId() == null
        ) {

            return null;
        }


        Integer typeId =
                user.getUserTypeId()
                        .getUserTypeId();


        if (
                Integer.valueOf(1)
                        .equals(typeId)
        ) {

            return recruiterProfileRepository
                    .findById(
                            user.getUserId()
                    )
                    .orElse(null);
        }


        if (
                Integer.valueOf(2)
                        .equals(typeId)
        ) {

            return jobSeekerProfileRepository
                    .findById(
                            user.getUserId()
                    )
                    .orElse(null);
        }


        return null;
    }


    // =====================================================
    // FIND BY EMAIL
    // =====================================================

    public Users findByEmail(
            String email) {

        if (
                email == null ||
                email.isBlank()
        ) {

            throw new UsernameNotFoundException(
                    "Email is required"
            );
        }


        return usersRepository
                .findByEmail(
                        email.trim()
                                .toLowerCase()
                )
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "User not found: "
                                        + email
                        )
                );
    }


    // =====================================================
    // GET USER BY EMAIL
    // =====================================================

    public Optional<Users> getUserByEmail(
            String email) {

        if (
                email == null ||
                email.isBlank()
        ) {

            return Optional.empty();
        }


        return usersRepository
                .findByEmail(
                        email.trim()
                                .toLowerCase()
                );
    }


    // =====================================================
    // DELETE JOB SEEKER ACCOUNT
    // =====================================================

    @Transactional
    public void deleteAccount(
            Integer userId) {

        // =================================================
        // CHECK USER ID
        // =================================================

        if (userId == null) {

            throw new IllegalArgumentException(
                    "User ID is required"
            );
        }


        // =================================================
        // FIND USER
        // =================================================

        Users user =
                usersRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                )
                        );


        // =================================================
        // CHECK USER TYPE
        // 2 = JOB SEEKER
        // =================================================

        if (
                user.getUserTypeId() == null ||
                !Integer.valueOf(2).equals(
                        user.getUserTypeId()
                                .getUserTypeId()
                )
        ) {

            throw new RuntimeException(
                    "Only Job Seeker account can be deleted here"
            );
        }


        // =================================================
        // STEP 1
        // DELETE JOB APPLICATIONS
        // =================================================

        List<JobSeekerApply> applications =
                jobSeekerApplyRepository
                        .findByUserId_UserId(
                                userId
                        );


        if (
                applications != null &&
                !applications.isEmpty()
        ) {

            jobSeekerApplyRepository
                    .deleteAll(
                            applications
                    );


            jobSeekerApplyRepository
                    .flush();
        }


        // =================================================
        // STEP 2
        // DELETE SAVED JOBS
        // =================================================

        List<JobSeekerSave> savedJobs =
                jobSeekerSaveRepository
                        .findByUserId(
                                userId
                        );


        if (
                savedJobs != null &&
                !savedJobs.isEmpty()
        ) {

            jobSeekerSaveRepository
                    .deleteAll(
                            savedJobs
                    );


            jobSeekerSaveRepository
                    .flush();
        }


        // =================================================
        // STEP 3
        // DELETE JOB SEEKER PROFILE
        // =================================================

        if (
                jobSeekerProfileRepository
                        .existsById(
                                userId
                        )
        ) {

            jobSeekerProfileRepository
                    .deleteById(
                            userId
                    );


            jobSeekerProfileRepository
                    .flush();
        }


        // =================================================
        // STEP 4
        // DELETE USER ACCOUNT
        // =================================================

        usersRepository
                .deleteById(
                        userId
                );


        usersRepository
                .flush();
    }
}