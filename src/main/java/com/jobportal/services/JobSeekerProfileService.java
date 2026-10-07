package com.jobportal.services;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.entity.JobSeekerProfile;
import com.jobportal.entity.Users;
import com.jobportal.repository.JobSeekerProfileRepository;
import com.jobportal.repository.UsersRepository;

@Service
public class JobSeekerProfileService {


    private final JobSeekerProfileRepository
            profileRepository;

    private final UsersRepository
            usersRepository;


    public JobSeekerProfileService(

            JobSeekerProfileRepository
                    profileRepository,

            UsersRepository usersRepository
    ) {

        this.profileRepository =
                profileRepository;

        this.usersRepository =
                usersRepository;
    }


    public Optional<JobSeekerProfile> getOne(
            Integer id
    ) {

        return profileRepository.findById(id);
    }


    @Transactional
    public JobSeekerProfile addNew(
            JobSeekerProfile profile
    ) {


        if (
                profile == null
        ) {

            throw new IllegalArgumentException(
                    "Profile data is required"
            );
        }


        Integer userId =
                profile.getUserAccountId();


        if (
                userId == null &&
                profile.getUserId() != null
        ) {

            userId =
                    profile.getUserId()
                            .getUserId();
        }


        if (
                userId == null
        ) {

            throw new IllegalArgumentException(
                    "User ID is required"
            );
        }


        Users user =
                usersRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new IllegalArgumentException(
                                        "User not found"
                                )
                        );


        JobSeekerProfile existing =
                profileRepository
                        .findById(userId)
                        .orElse(null);


        if (
                existing == null
        ) {

            profile.setUserId(user);

            profile.setUserAccountId(
                    userId
            );

            return profileRepository.save(
                    profile
            );
        }


        existing.setFirstName(
                profile.getFirstName()
        );

        existing.setLastName(
                profile.getLastName()
        );

        existing.setCity(
                profile.getCity()
        );

        existing.setState(
                profile.getState()
        );

        existing.setCountry(
                profile.getCountry()
        );

        existing.setWorkAuthorization(
                profile.getWorkAuthorization()
        );

        existing.setEmploymentType(
                profile.getEmploymentType()
        );

        existing.setProfilePhoto(
                profile.getProfilePhoto()
        );


        if (
                profile.getResume() != null &&
                !profile.getResume().isBlank()
        ) {

            existing.setResume(
                    profile.getResume()
            );
        }


        return profileRepository.save(
                existing
        );
    }
}