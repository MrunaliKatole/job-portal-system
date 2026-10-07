package com.jobportal.repository;

import com.jobportal.entity.JobPostActivity;
import com.jobportal.entity.JobSeekerSave;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobSeekerSaveRepository
        extends JpaRepository<JobSeekerSave, Integer> {


    // =====================================================
    // CHECK SAVED JOB
    // =====================================================

    boolean existsByUserIdAndJob(
            Integer userId,
            JobPostActivity job
    );


    // =====================================================
    // GET SAVED JOBS BY USER
    // =====================================================

    List<JobSeekerSave> findByUserId(
            Integer userId
    );


    // =====================================================
    // GET SAVED JOBS BY JOB
    // =====================================================

    List<JobSeekerSave> findByJob(
            JobPostActivity job
    );


    // =====================================================
    // COUNT USER SAVED JOBS
    // =====================================================

    long countByUserId(
            Integer userId
    );


    // =====================================================
    // DELETE ALL SAVED JOBS BY USER
    // =====================================================

    void deleteByUserId(
            Integer userId
    );
}