package com.jobportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "job_seeker_apply")
public class JobSeekerApply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "user_id",
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
    private Users userId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "job_id",
            referencedColumnName = "job_post_id",
            nullable = false
    )
    @JsonIgnoreProperties({
            "postedById",
            "jobLocationId",
            "jobCompanyId",
            "hibernateLazyInitializer",
            "handler"
    })
    private JobPostActivity job;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(
            name = "apply_date",
            nullable = false
    )
    private Date applyDate = new Date();


    // CONSTRUCTOR


    public JobSeekerApply() {
    }


    // GETTERS & SETTERS
  

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public Users getUserId() {
        return userId;
    }

    public void setUserId(Users userId) {
        this.userId = userId;
    }


    public JobPostActivity getJob() {
        return job;
    }

    public void setJob(JobPostActivity job) {
        this.job = job;
    }


    public Date getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(Date applyDate) {
        this.applyDate = applyDate;
    }
}