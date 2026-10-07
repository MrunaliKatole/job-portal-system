package com.jobportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "job_seeker_save")
@JsonIgnoreProperties({
        "hibernateLazyInitializer",
        "handler"
})
public class JobSeekerSave {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @Column(name = "user_id")
    private Integer userId;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "job_id")
    @JsonIgnoreProperties({
            "hibernateLazyInitializer",
            "handler"
    })
    private JobPostActivity job;


    // CONSTRUCTOR


    public JobSeekerSave() {
    }

    // ID


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // USER ID


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    // JOB
    public JobPostActivity getJob() {
        return job;
    }

    public void setJob(JobPostActivity job) {
        this.job = job;
    }
}