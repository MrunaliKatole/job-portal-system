package com.jobportal.entity;

public class JobApplicantDto {

    private Integer applicationId;

    private Integer userId;

    private Integer profileId;

    private String firstName;

    private String lastName;

    private String email;

    private String city;

    private String state;

    private String country;

    private String employmentType;

    private String workAuthorization;

    private String profilePhoto;

    private String resume;


    public JobApplicantDto() {
    }


    public JobApplicantDto(
            Integer applicationId,
            Integer userId,
            Integer profileId,
            String firstName,
            String lastName,
            String email,
            String city,
            String state,
            String country,
            String employmentType,
            String workAuthorization,
            String profilePhoto,
            String resume
    ) {

        this.applicationId =
                applicationId;

        this.userId =
                userId;

        this.profileId =
                profileId;

        this.firstName =
                firstName;

        this.lastName =
                lastName;

        this.email =
                email;

        this.city =
                city;

        this.state =
                state;

        this.country =
                country;

        this.employmentType =
                employmentType;

        this.workAuthorization =
                workAuthorization;

        this.profilePhoto =
                profilePhoto;

        this.resume =
                resume;
    }


    public Integer getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(
            Integer applicationId
    ) {
        this.applicationId =
                applicationId;
    }


    public Integer getUserId() {
        return userId;
    }

    public void setUserId(
            Integer userId
    ) {
        this.userId =
                userId;
    }


    public Integer getProfileId() {
        return profileId;
    }

    public void setProfileId(
            Integer profileId
    ) {
        this.profileId =
                profileId;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(
            String firstName
    ) {
        this.firstName =
                firstName;
    }


    public String getLastName() {
        return lastName;
    }

    public void setLastName(
            String lastName
    ) {
        this.lastName =
                lastName;
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(
            String email
    ) {
        this.email =
                email;
    }


    public String getCity() {
        return city;
    }

    public void setCity(
            String city
    ) {
        this.city =
                city;
    }


    public String getState() {
        return state;
    }

    public void setState(
            String state
    ) {
        this.state =
                state;
    }


    public String getCountry() {
        return country;
    }

    public void setCountry(
            String country
    ) {
        this.country =
                country;
    }


    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(
            String employmentType
    ) {
        this.employmentType =
                employmentType;
    }


    public String getWorkAuthorization() {
        return workAuthorization;
    }

    public void setWorkAuthorization(
            String workAuthorization
    ) {
        this.workAuthorization =
                workAuthorization;
    }


    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(
            String profilePhoto
    ) {
        this.profilePhoto =
                profilePhoto;
    }


    public String getResume() {
        return resume;
    }

    public void setResume(
            String resume
    ) {
        this.resume =
                resume;
    }
}