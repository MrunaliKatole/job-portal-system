package com.jobportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "job_post_activity")
public class JobPostActivity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_post_id")
    private Integer jobPostId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "posted_by_id",
            referencedColumnName = "user_id",
            nullable = false
    )
    @JsonIgnoreProperties({
            "password",
            "registrationDate",
            "userTypeId",
            "hibernateLazyInitializer",
            "handler"
    })
    private Users postedById;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "job_location_id",
            referencedColumnName = "id"
    )
    @JsonIgnoreProperties({
            "hibernateLazyInitializer",
            "handler"
    })
    private JobLocation jobLocationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "job_company_id",
            referencedColumnName = "id"
    )
    @JsonIgnoreProperties({
            "hibernateLazyInitializer",
            "handler"
    })
    private JobCompany jobCompanyId;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(name = "description_of_job", length = 5000)
    private String descriptionOfJob;

    @Column(name = "job_type")
    private String jobType;

    @Column(name = "salary")
    private String salary;

    @Column(name = "remote")
    private String remote;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "posted_date")
    private Date postedDate = new Date();

    // ================= CONSTRUCTOR =================

    public JobPostActivity() {
    }

    // ================= GETTERS & SETTERS =================

    public Integer getJobPostId() {
        return jobPostId;
    }

    public void setJobPostId(Integer jobPostId) {
        this.jobPostId = jobPostId;
    }

    public Users getPostedById() {
        return postedById;
    }

    public void setPostedById(Users postedById) {
        this.postedById = postedById;
    }

    public JobLocation getJobLocationId() {
        return jobLocationId;
    }

    public void setJobLocationId(JobLocation jobLocationId) {
        this.jobLocationId = jobLocationId;
    }

    public JobCompany getJobCompanyId() {
        return jobCompanyId;
    }

    public void setJobCompanyId(JobCompany jobCompanyId) {
        this.jobCompanyId = jobCompanyId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getDescriptionOfJob() {
        return descriptionOfJob;
    }

    public void setDescriptionOfJob(String descriptionOfJob) {
        this.descriptionOfJob = descriptionOfJob;
    }

    public String getJobType() {
        return jobType;
    }

    public void setJobType(String jobType) {
        this.jobType = jobType;
    }

    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }

    public String getRemote() {
        return remote;
    }

    public void setRemote(String remote) {
        this.remote = remote;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Date getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(Date postedDate) {
        this.postedDate = postedDate;
    }
}