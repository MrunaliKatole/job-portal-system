package com.jobportal.dto;

import com.jobportal.entity.JobSeekerProfile;

public class ApplicantDto {

    private Integer applicationId;

    private Integer userId;

    private Integer jobId;

    private String applyDate;

    private String email;

    private JobSeekerProfile jobSeekerProfile;


    public ApplicantDto() {
    }


    public Integer getApplicationId() {
        return applicationId;
    }


    public void setApplicationId(
            Integer applicationId) {

        this.applicationId =
                applicationId;
    }


    public Integer getUserId() {
        return userId;
    }


    public void setUserId(
            Integer userId) {

        this.userId =
                userId;
    }


    public Integer getJobId() {
        return jobId;
    }


    public void setJobId(
            Integer jobId) {

        this.jobId =
                jobId;
    }


    public String getApplyDate() {
        return applyDate;
    }


    public void setApplyDate(
            String applyDate) {

        this.applyDate =
                applyDate;
    }


    public String getEmail() {
        return email;
    }


    public void setEmail(
            String email) {

        this.email =
                email;
    }


    public JobSeekerProfile getJobSeekerProfile() {
        return jobSeekerProfile;
    }


    public void setJobSeekerProfile(
            JobSeekerProfile jobSeekerProfile) {

        this.jobSeekerProfile =
                jobSeekerProfile;
    }
}