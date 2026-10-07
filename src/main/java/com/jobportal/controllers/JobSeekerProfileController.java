package com.jobportal.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobportal.entity.JobSeekerProfile;
import com.jobportal.repository.JobSeekerProfileRepository;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/jobseeker")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class JobSeekerProfileController {

    private final JobSeekerProfileRepository profileRepository;

    private final ObjectMapper objectMapper;


    public JobSeekerProfileController(
            JobSeekerProfileRepository profileRepository,
            ObjectMapper objectMapper
    ) {

        this.profileRepository =
                profileRepository;

        this.objectMapper =
                objectMapper;
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getProfile(
            @PathVariable Integer id
    ) {

        try {

            JobSeekerProfile profile =
                    profileRepository
                            .findById(id)
                            .orElse(null);


            if (profile == null) {

                return ResponseEntity
                        .ok()
                        .body(
                                createEmptyProfile(id)
                        );
            }


            return ResponseEntity
                    .ok(profile);


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Unable to load profile"
                    );
        }
    }

    @PostMapping(
            consumes =
                    MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> saveProfile(

            @RequestPart("profile")
            String profileJson,

            @RequestPart(
                    value = "resume",
                    required = false
            )
            MultipartFile resume

    ) {

        try {


            JobSeekerProfile incomingProfile =
                    objectMapper.readValue(
                            profileJson,
                            JobSeekerProfile.class
                    );



            Integer userAccountId =
                    incomingProfile
                            .getUserAccountId();




            if (userAccountId == null) {

                return ResponseEntity
                        .badRequest()
                        .body(
                                "User Account ID is required"
                        );
            }



            JobSeekerProfile existingProfile =
                    profileRepository
                            .findById(
                                    userAccountId
                            )
                            .orElse(null);



            if (existingProfile == null) {

                existingProfile =
                        new JobSeekerProfile();

                existingProfile
                        .setUserAccountId(
                                userAccountId
                        );
            }



            if (
                    incomingProfile.getUserId()
                    != null
            ) {

                existingProfile
                        .setUserId(
                                incomingProfile
                                        .getUserId()
                        );
            }



            existingProfile.setFirstName(
                    incomingProfile
                            .getFirstName()
            );

            existingProfile.setLastName(
                    incomingProfile
                            .getLastName()
            );

            existingProfile.setCity(
                    incomingProfile
                            .getCity()
            );

            existingProfile.setState(
                    incomingProfile
                            .getState()
            );

            existingProfile.setCountry(
                    incomingProfile
                            .getCountry()
            );



            existingProfile
                    .setWorkAuthorization(
                            incomingProfile
                                    .getWorkAuthorization()
                    );

            existingProfile
                    .setEmploymentType(
                            incomingProfile
                                    .getEmploymentType()
                    );



            existingProfile
                    .setProfilePhoto(
                            incomingProfile
                                    .getProfilePhoto()
                    );



            if (
                    resume != null &&
                    !resume.isEmpty()
            ) {

                // original file name
                existingProfile.setResume(
                        resume.getOriginalFilename()
                );


                // Save actual PDF bytes
                existingProfile.setResumeData(
                        resume.getBytes()
                );
            }



            JobSeekerProfile savedProfile =
                    profileRepository.save(
                            existingProfile
                    );



            return ResponseEntity
                    .ok(savedProfile);


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Unable to save profile: "
                            + e.getMessage()
                    );
        }
    }



    @GetMapping("/{id}/resume")
    public ResponseEntity<?> viewResume(
            @PathVariable Integer id
    ) {

        try {


            JobSeekerProfile profile =
                    profileRepository
                            .findById(id)
                            .orElse(null);


            if (profile == null) {

                return ResponseEntity
                        .status(
                                HttpStatus.NOT_FOUND
                        )
                        .body(
                                "Job Seeker Profile not found"
                        );
            }

            if (
                    profile.getResumeData() == null ||
                    profile.getResumeData().length == 0
            ) {

                return ResponseEntity
                        .status(
                                HttpStatus.NOT_FOUND
                        )
                        .body(
                                "Resume not found"
                        );
            }


            String fileName =
                    profile.getResume();


            if (
                    fileName == null ||
                    fileName.isBlank()
            ) {

                fileName =
                        "resume.pdf";
            }


            return ResponseEntity
                    .ok()
                    .contentType(
                            MediaType.APPLICATION_PDF
                    )
                    .header(
                            HttpHeaders.CONTENT_DISPOSITION,
                            "inline; filename=\""
                                    + fileName
                                    + "\""
                    )
                    .body(
                            profile.getResumeData()
                    );


        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity
                    .status(
                            HttpStatus.INTERNAL_SERVER_ERROR
                    )
                    .body(
                            "Unable to view resume: "
                                    + e.getMessage()
                    );
        }
    }

    private JobSeekerProfile createEmptyProfile(
            Integer userAccountId
    ) {

        JobSeekerProfile profile =
                new JobSeekerProfile();


        profile.setUserAccountId(
                userAccountId
        );


        return profile;
    }
}