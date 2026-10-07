package com.jobportal.controllers;

import com.jobportal.entity.RecruiterProfile;
import com.jobportal.services.RecruiterProfileService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiter")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class RecruiterProfileController {

    private final RecruiterProfileService service;

    public RecruiterProfileController(
            RecruiterProfileService service) {

        this.service = service;
    }

    @PostMapping
    public RecruiterProfile saveProfile(

            @RequestBody RecruiterProfile profile,

            @RequestParam Integer userId) {

        return service.addNew(
                profile,
                userId
        );
    }

    @GetMapping("/{id}")
    public RecruiterProfile getProfile(

            @PathVariable Integer id) {

        return service.getOne(id);
    }
}