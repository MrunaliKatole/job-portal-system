package com.jobportal.services;

import com.jobportal.entity.JobPostActivity;
import com.jobportal.entity.JobSeekerSave;

import com.jobportal.repository.JobPostActivityRepository;
import com.jobportal.repository.JobSeekerSaveRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class JobSeekerSaveService {

    private final JobSeekerSaveRepository saveRepository;
    private final JobPostActivityRepository jobRepository;


    public JobSeekerSaveService(
            JobSeekerSaveRepository saveRepository,
            JobPostActivityRepository jobRepository) {

        this.saveRepository = saveRepository;
        this.jobRepository = jobRepository;
    }


    public JobSeekerSave saveJob(
            Integer userId,
            Integer jobId) {

        
        JobPostActivity job =
                jobRepository.findById(jobId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job not found for ID: "
                                                + jobId
                                )
                        );


   
        if (saveRepository.existsByUserIdAndJob(
                userId,
                job)) {

            throw new RuntimeException(
                    "Job already saved."
            );
        }


        JobSeekerSave save =
                new JobSeekerSave();


        save.setUserId(userId);

        save.setJob(job);


  
        return saveRepository.save(save);
    }


    @Transactional(readOnly = true)
    public List<JobSeekerSave> getSavedJobs(
            Integer userId) {

        return saveRepository.findByUserId(userId);
    }


    @Transactional(readOnly = true)
    public long getSavedJobsCount(
            Integer userId) {

        return saveRepository.countByUserId(userId);
    }


    @Transactional(readOnly = true)
    public List<JobSeekerSave> getJobCandidates(
            Integer jobId) {

        JobPostActivity job =
                jobRepository.findById(jobId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Job not found"
                                )
                        );

        return saveRepository.findByJob(job);
    }
}