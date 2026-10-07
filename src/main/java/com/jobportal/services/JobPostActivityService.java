package com.jobportal.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobportal.entity.IRecruiterJobs;
import com.jobportal.entity.JobCompany;
import com.jobportal.entity.JobLocation;
import com.jobportal.entity.JobPostActivity;
import com.jobportal.entity.RecruiterJobsDto;
import com.jobportal.entity.Users;
import com.jobportal.repository.JobPostActivityRepository;
import com.jobportal.repository.JobSeekerApplyRepository;
import com.jobportal.repository.JobSeekerSaveRepository;
import com.jobportal.repository.UsersRepository;

@Service
@Transactional
public class JobPostActivityService {

    private final JobPostActivityRepository jobPostActivityRepository;

    private final UsersRepository usersRepository;

    private final JobSeekerApplyRepository jobSeekerApplyRepository;

    private final JobSeekerSaveRepository jobSeekerSaveRepository;


    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public JobPostActivityService(
            JobPostActivityRepository jobPostActivityRepository,
            UsersRepository usersRepository,
            JobSeekerApplyRepository jobSeekerApplyRepository,
            JobSeekerSaveRepository jobSeekerSaveRepository) {

        this.jobPostActivityRepository =
                jobPostActivityRepository;

        this.usersRepository =
                usersRepository;

        this.jobSeekerApplyRepository =
                jobSeekerApplyRepository;

        this.jobSeekerSaveRepository =
                jobSeekerSaveRepository;
    }


    // =====================================================
    // ADD NEW JOB
    // =====================================================

    public JobPostActivity addNew(
            JobPostActivity jobPostActivity,
            Integer userId) {

        if (userId == null) {

            throw new RuntimeException(
                    "User ID is required"
            );
        }


        Users user =
                usersRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found for ID: "
                                                + userId
                                )
                        );


        // Set recruiter/user who posted job
        jobPostActivity.setPostedById(
                user
        );


        // Default active
        if (jobPostActivity.getIsActive() == null) {

            jobPostActivity.setIsActive(
                    true
            );
        }


        // Default posted date
        if (jobPostActivity.getPostedDate() == null) {

            jobPostActivity.setPostedDate(
                    new Date()
            );
        }


        return jobPostActivityRepository.save(
                jobPostActivity
        );
    }


    // =====================================================
    // GET RECRUITER JOBS
    // =====================================================

    @Transactional(readOnly = true)
    public List<RecruiterJobsDto> getRecruiterJobs(
            int recruiter) {

        List<IRecruiterJobs> results =
                jobPostActivityRepository
                        .getRecruiterJobs(recruiter);


        List<RecruiterJobsDto> list =
                new ArrayList<>();


        for (IRecruiterJobs rec : results) {

            JobLocation location =
                    new JobLocation(
                            rec.getLocationId(),
                            rec.getCity(),
                            rec.getState(),
                            rec.getCountry()
                    );


            JobCompany company =
                    new JobCompany(
                            rec.getCompanyId(),
                            rec.getName(),
                            ""
                    );


            RecruiterJobsDto dto =
                    new RecruiterJobsDto(
                            rec.getTotalCandidates(),
                            rec.getJobPostId(),
                            rec.getJobTitle(),
                            location,
                            company
                    );


            list.add(dto);
        }


        return list;
    }


    // =====================================================
    // GET ONE JOB
    // =====================================================

    @Transactional(readOnly = true)
    public JobPostActivity getOne(
            int id) {

        return jobPostActivityRepository
                .findById(id)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found for ID: "
                                        + id
                        )
                );
    }


    // =====================================================
    // GET ALL JOBS
    // =====================================================

    @Transactional(readOnly = true)
    public List<JobPostActivity> getAll() {

        return jobPostActivityRepository
                .findAll();
    }


    // =====================================================
    // SEARCH JOBS
    // =====================================================

    @Transactional(readOnly = true)
    public List<JobPostActivity> search(
            String job,
            String location,
            List<String> type,
            List<String> remote,
            Date searchDate) {

        if (searchDate == null) {

            return jobPostActivityRepository
                    .searchWithoutDate(
                            job,
                            location,
                            remote,
                            type
                    );
        }


        return jobPostActivityRepository
                .search(
                        job,
                        location,
                        remote,
                        type,
                        searchDate
                );
    }


    // =====================================================
    // DELETE JOB
    // =====================================================
    //
    // IMPORTANT:
    //
    // First delete:
    // 1. Job Seeker Applications
    // 2. Saved Jobs
    //
    // Then delete:
    // 3. Job
    //
    // This avoids MySQL FK 1451 error.
    // =====================================================

    @Transactional
    public void deleteJob(
            Integer id) {

        // -------------------------------------------------
        // VALIDATE JOB ID
        // -------------------------------------------------

        if (id == null) {

            throw new IllegalArgumentException(
                    "Job ID is required"
            );
        }


        // -------------------------------------------------
        // FIND JOB
        // -------------------------------------------------

        JobPostActivity job =
                jobPostActivityRepository
                        .findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job not found for ID: "
                                                + id
                                )
                        );


        // =================================================
        // STEP 1
        // DELETE JOB APPLICATIONS
        // =================================================
        //
        // job_seeker_apply.job_id
        // references
        // job_post_activity.job_post_id
        //
        // Therefore applications must be deleted first.
        // =================================================

        List<com.jobportal.entity.JobSeekerApply> applications =
                jobSeekerApplyRepository
                        .findByJob_JobPostId(id);


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
        //
        // Any job seeker who saved this job
        // must have that saved-job record deleted.
        // =================================================

        List<com.jobportal.entity.JobSeekerSave> savedJobs =
                jobSeekerSaveRepository
                        .findByJob(job);


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
        // DELETE JOB
        // =================================================

        jobPostActivityRepository
                .delete(
                        job
                );


        // Force database execution
        jobPostActivityRepository
                .flush();
    }
}