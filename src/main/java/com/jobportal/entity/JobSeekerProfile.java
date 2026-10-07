package com.jobportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "job_seeker_profile")
public class JobSeekerProfile {

    @Id
    @Column(name = "user_account_id")
    private Integer userAccountId;


    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(
            name = "user_account_id",
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


    // PROFILE FIELDS
 

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "city")
    private String city;

    @Column(name = "state")
    private String state;

    @Column(name = "country")
    private String country;

    @Column(name = "work_authorization")
    private String workAuthorization;

    @Column(name = "employment_type")
    private String employmentType;

    @Column(name = "profile_photo")
    private String profilePhoto;

    @Column(
            name = "resume",
            length = 1000
    )
    private String resume;

    @Lob
    @Column(
            name = "resume_data",
            columnDefinition = "LONGBLOB"
    )
    private byte[] resumeData;


    // =====================================================
    // TRANSIENT SKILLS
    // =====================================================

    @Transient
    private String skills;


    // CONSTRUCTORS


    public JobSeekerProfile() {
    }


    public JobSeekerProfile(Users user) {

        this.userId = user;

        if (user != null) {

            this.userAccountId =
                    user.getUserId();
        }
    }


    // GETTERS & SETTERS


    public Integer getUserAccountId() {

        return userAccountId;
    }


    public void setUserAccountId(
            Integer userAccountId) {

        this.userAccountId =
                userAccountId;
    }


    public Users getUserId() {

        return userId;
    }


    public void setUserId(
            Users userId) {

        this.userId =
                userId;

        if (userId != null) {

            this.userAccountId =
                    userId.getUserId();
        }
    }


    public String getFirstName() {

        return firstName;
    }


    public void setFirstName(
            String firstName) {

        this.firstName =
                firstName;
    }


    public String getLastName() {

        return lastName;
    }


    public void setLastName(
            String lastName) {

        this.lastName =
                lastName;
    }


    public String getCity() {

        return city;
    }


    public void setCity(
            String city) {

        this.city =
                city;
    }


    public String getState() {

        return state;
    }


    public void setState(
            String state) {

        this.state =
                state;
    }


    public String getCountry() {

        return country;
    }


    public void setCountry(
            String country) {

        this.country =
                country;
    }


    public String getWorkAuthorization() {

        return workAuthorization;
    }


    public void setWorkAuthorization(
            String workAuthorization) {

        this.workAuthorization =
                workAuthorization;
    }


    public String getEmploymentType() {

        return employmentType;
    }


    public void setEmploymentType(
            String employmentType) {

        this.employmentType =
                employmentType;
    }


    public String getProfilePhoto() {

        return profilePhoto;
    }


    public void setProfilePhoto(
            String profilePhoto) {

        this.profilePhoto =
                profilePhoto;
    }


    public String getResume() {

        return resume;
    }


    public void setResume(
            String resume) {

        this.resume =
                resume;
    }


    public byte[] getResumeData() {

        return resumeData;
    }


    public void setResumeData(
            byte[] resumeData) {

        this.resumeData =
                resumeData;
    }


    public String getSkills() {

        return skills;
    }


    public void setSkills(
            String skills) {

        this.skills =
                skills;
    }


    // =====================================================
    // PHOTO PATH
    // =====================================================

    @JsonProperty("photosImagePath")
    @Transient
    public String getPhotosImagePath() {

        if (
                profilePhoto == null ||
                userAccountId == null
        ) {

            return null;
        }

        return "/photos/jobseeker/"
                + userAccountId
                + "/"
                + profilePhoto;
    }
}