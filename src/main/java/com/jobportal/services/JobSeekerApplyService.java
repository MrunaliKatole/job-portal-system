package com.jobportal.services;

import com.jobportal.entity.JobPostActivity;
import com.jobportal.entity.JobSeekerApply;
import com.jobportal.entity.JobSeekerProfile;
import com.jobportal.entity.Users;
import com.jobportal.dto.ApplicantDto;
import com.jobportal.repository.JobPostActivityRepository;
import com.jobportal.repository.JobSeekerApplyRepository;
import com.jobportal.repository.JobSeekerProfileRepository;
import com.jobportal.repository.UsersRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
public class JobSeekerApplyService {

    private final JobSeekerApplyRepository applyRepository;

    private final UsersRepository usersRepository;

    private final JobPostActivityRepository jobPostActivityRepository;

    private final JobSeekerProfileRepository profileRepository;


    public JobSeekerApplyService(
            JobSeekerApplyRepository applyRepository,
            UsersRepository usersRepository,
            JobPostActivityRepository jobPostActivityRepository,
            JobSeekerProfileRepository profileRepository) {

        this.applyRepository =
                applyRepository;

        this.usersRepository =
                usersRepository;

        this.jobPostActivityRepository =
                jobPostActivityRepository;

        this.profileRepository =
                profileRepository;
    }


    // =====================================================
    // APPLY FOR JOB
    // =====================================================

    @Transactional
    public JobSeekerApply applyJob(
            Integer userId,
            Integer jobId) {

        if (userId == null) {

            throw new RuntimeException(
                    "User ID is required."
            );
        }

        if (jobId == null) {

            throw new RuntimeException(
                    "Job ID is required."
            );
        }


        Users user =
                usersRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found: "
                                                + userId
                                )
                        );


        JobPostActivity job =
                jobPostActivityRepository
                        .findById(jobId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job not found: "
                                                + jobId
                                )
                        );


        boolean alreadyApplied =
                applyRepository
                        .existsByUserIdAndJob(
                                user,
                                job
                        );


        if (alreadyApplied) {

            throw new RuntimeException(
                    "You have already applied for this job."
            );
        }


        JobSeekerApply application =
                new JobSeekerApply();

        application.setUserId(user);

        application.setJob(job);

        application.setApplyDate(
                new Date()
        );


        return applyRepository.save(
                application
        );
    }


    @Transactional(readOnly = true)
    public List<JobSeekerApply> getAppliedJobs(
            Integer userId) {

        if (userId == null) {

            throw new RuntimeException(
                    "User ID is required."
            );
        }

        return applyRepository
                .findByUserId_UserId(
                        userId
                );
    }

    @Transactional(readOnly = true)
    public long getAppliedJobsCount(
            Integer userId) {

        if (userId == null) {

            throw new RuntimeException(
                    "User ID is required."
            );
        }

        return applyRepository
                .findByUserId_UserId(
                        userId
                )
                .size();
    }




    @Transactional(readOnly = true)
    public List<JobSeekerApply> getApplicants(
            Integer jobId) {

        if (jobId == null) {

            throw new RuntimeException(
                    "Job ID is required."
            );
        }


        List<JobSeekerApply> applications =
                applyRepository
                        .findByJob_JobPostId(
                                jobId
                        );



        for (
                JobSeekerApply application :
                applications
        ) {

            if (
                    application.getUserId() != null
            ) {

                Integer userId =
                        application
                                .getUserId()
                                .getUserId();


                JobSeekerProfile profile =
                        profileRepository
                                .findById(userId)
                                .orElse(null);


            }
        }


        return applications;
    }
  
}