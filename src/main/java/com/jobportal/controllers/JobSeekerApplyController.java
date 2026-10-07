package com.jobportal.controllers;

import com.jobportal.entity.JobSeekerApply;
import com.jobportal.services.JobSeekerApplyService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:5173")
public class JobSeekerApplyController {

    private final JobSeekerApplyService applyService;


    public JobSeekerApplyController(
            JobSeekerApplyService applyService) {

        this.applyService =
                applyService;
    }


    @PostMapping(
            "/apply/{userId}/{jobId}"
    )
    public ResponseEntity<?> applyJob(
            @PathVariable Integer userId,
            @PathVariable Integer jobId) {

        try {

            JobSeekerApply application =
                    applyService.applyJob(
                            userId,
                            jobId
                    );

            return ResponseEntity
                    .status(
                            HttpStatus.CREATED
                    )
                    .body(application);

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }

    @GetMapping(
            "/user/{userId}"
    )
    public ResponseEntity<?> getAppliedJobs(
            @PathVariable Integer userId) {

        try {

            List<JobSeekerApply> applications =
                    applyService
                            .getAppliedJobs(
                                    userId
                            );

            return ResponseEntity.ok(
                    applications
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            e.getMessage()
                    );
        }
    }


    @GetMapping(
            "/user/{userId}/count"
    )
    public ResponseEntity<?> getAppliedJobsCount(
            @PathVariable Integer userId) {

        try {

            long count =
                    applyService
                            .getAppliedJobsCount(
                                    userId
                            );

            return ResponseEntity.ok(
                    count
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            e.getMessage()
                    );
        }
    }

    @GetMapping(
            "/job/{jobId}"
    )
    public ResponseEntity<?> getApplicants(
            @PathVariable Integer jobId) {

        try {

            List<JobSeekerApply> applicants =
                    applyService
                            .getApplicants(
                                    jobId
                            );

            return ResponseEntity.ok(
                    applicants
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            e.getMessage()
                    );
        }
    }
}