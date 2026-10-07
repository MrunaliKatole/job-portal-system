package com.jobportal.services;

import com.jobportal.entity.RecruiterProfile;
import com.jobportal.entity.Users;
import com.jobportal.repository.RecruiterProfileRepository;
import com.jobportal.repository.UsersRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecruiterProfileService {

    private final RecruiterProfileRepository recruiterRepository;
    private final UsersRepository usersRepository;

    public RecruiterProfileService(
            RecruiterProfileRepository recruiterRepository,
            UsersRepository usersRepository) {

        this.recruiterRepository = recruiterRepository;
        this.usersRepository = usersRepository;
    }


    public RecruiterProfile getOne(Integer id) {

        return recruiterRepository
                .findById(id)
                .orElse(null);
    }


    @Transactional
    public RecruiterProfile addNew(
            RecruiterProfile profile,
            Integer userId) {

        if (userId == null) {
            throw new RuntimeException(
                    "User ID is required"
            );
        }

        Users user = usersRepository
                .findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + userId
                        )
                );

        RecruiterProfile existing =
                recruiterRepository
                        .findById(userId)
                        .orElse(null);

        if (existing == null) {

            profile.setUserId(user);
            profile.setUserAccountId(userId);

            return recruiterRepository.save(profile);
        }

       
        existing.setUserId(user);
        existing.setUserAccountId(userId);

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

        existing.setCompany(
                profile.getCompany()
        );

        existing.setProfilePhoto(
                profile.getProfilePhoto()
        );

        return recruiterRepository.save(existing);
    }
}