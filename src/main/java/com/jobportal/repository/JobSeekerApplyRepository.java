package com.jobportal.repository;

import com.jobportal.entity.JobPostActivity;
import com.jobportal.entity.JobSeekerApply;
import com.jobportal.entity.Users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSeekerApplyRepository
        extends JpaRepository<JobSeekerApply, Integer> {


    // =====================================================
    // GET APPLICATIONS BY USER
    // =====================================================

    List<JobSeekerApply> findByUserId_UserId(
            Integer userId
    );


    // =====================================================
    // GET APPLICATIONS BY JOB
    // =====================================================

    List<JobSeekerApply> findByJob_JobPostId(
            Integer jobId
    );


    // =====================================================
    // CHECK IF USER APPLIED FOR JOB
    // =====================================================

    boolean existsByUserIdAndJob(
            Users user,
            JobPostActivity job
    );
}