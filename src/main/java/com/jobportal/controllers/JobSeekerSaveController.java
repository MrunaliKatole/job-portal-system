package com.jobportal.controllers;

import com.jobportal.entity.JobSeekerSave;
import com.jobportal.services.JobSeekerSaveService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saved-jobs")
@CrossOrigin(origins = "http://localhost:5173")
public class JobSeekerSaveController {

    private final JobSeekerSaveService saveService;


    public JobSeekerSaveController(
            JobSeekerSaveService saveService) {

        this.saveService = saveService;
    }

    @PostMapping("/save/{userId}/{jobId}")
    public ResponseEntity<?> saveJob(
            @PathVariable Integer userId,
            @PathVariable Integer jobId) {

        try {

            JobSeekerSave save =
                    saveService.saveJob(
                            userId,
                            jobId
                    );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(save);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getSavedJobs(
            @PathVariable Integer userId) {

        try {

            List<JobSeekerSave> savedJobs =
                    saveService.getSavedJobs(userId);

            return ResponseEntity.ok(
                    savedJobs
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    @GetMapping("/user/{userId}/count")
    public ResponseEntity<?> getSavedJobsCount(
            @PathVariable Integer userId) {

        try {

            long count =
                    saveService.getSavedJobsCount(userId);

            return ResponseEntity.ok(count);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }


    @GetMapping("/job/{jobId}")
    public ResponseEntity<?> getJobCandidates(
            @PathVariable Integer jobId) {

        try {

            List<JobSeekerSave> candidates =
                    saveService.getJobCandidates(jobId);

            return ResponseEntity.ok(
                    candidates
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}