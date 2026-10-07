package com.jobportal.controllers;

import com.jobportal.entity.JobPostActivity;
import com.jobportal.services.JobPostActivityService;

import org.springframework.web.bind.annotation.*;
import com.jobportal.entity.RecruiterJobsDto;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class JobPostActivityController {

    private final JobPostActivityService service;

    public JobPostActivityController(
            JobPostActivityService service) {

        this.service = service;
    }


    // =====================================================
    // GET ALL JOBS
    // =====================================================

    @GetMapping
    public List<JobPostActivity> getAllJobs() {

        return service.getAll();
    }


    // =====================================================
    // GET SINGLE JOB
    // =====================================================

    @GetMapping("/{id}")
    public JobPostActivity getJob(
            @PathVariable Integer id) {

        return service.getOne(id);
    }


    // =====================================================
    // POST NEW JOB
    // =====================================================

    @PostMapping
    public JobPostActivity addJob(
            @RequestBody JobPostActivity job,
            @RequestParam Integer userId) {

        return service.addNew(
                job,
                userId
        );
    }


    // =====================================================
    // RECRUITER MY JOBS
    // =====================================================

    @GetMapping("/recruiter/{recruiterId}")
    public List<RecruiterJobsDto> getRecruiterJobs(
            @PathVariable Integer recruiterId) {

        return service.getRecruiterJobs(
                recruiterId
        );
    }


    // =====================================================
    // DELETE JOB
    // =====================================================

    @DeleteMapping("/{id}")
    public String deleteJob(
            @PathVariable Integer id) {

        service.deleteJob(id);

        return "Job deleted successfully";
    }

}