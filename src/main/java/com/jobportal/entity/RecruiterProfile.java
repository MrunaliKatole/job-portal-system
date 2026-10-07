package com.jobportal.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table(name = "recruiter_profile")
public class RecruiterProfile {

    @Id
    @Column(name = "user_account_id")
    private Integer userAccountId;

    @OneToOne(
            fetch = FetchType.EAGER,
            optional = false
    )
    @MapsId
    @JoinColumn(
            name = "user_account_id",
            referencedColumnName = "user_id"
    )
    @JsonIgnoreProperties({
            "password",
            "registrationDate",
            "userTypeId",
            "hibernateLazyInitializer",
            "handler"
    })
    private Users userId;

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

    @Column(name = "company")
    private String company;

    @Column(name = "profile_photo")
    private String profilePhoto;

    public RecruiterProfile() {
    }

    public RecruiterProfile(Users user) {

        this.userId = user;

        if (user != null) {
            this.userAccountId =
                    user.getUserId();
        }
    }

    public Integer getUserAccountId() {
        return userAccountId;
    }

    public void setUserAccountId(
            Integer userAccountId
    ) {
        this.userAccountId =
                userAccountId;
    }

    public Users getUserId() {
        return userId;
    }

    public void setUserId(Users userId) {

        this.userId = userId;

        if (userId != null) {
            this.userAccountId =
                    userId.getUserId();
        }
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(
            String firstName
    ) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(
            String lastName
    ) {
        this.lastName = lastName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
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

    @JsonProperty("photosImagePath")
    @Transient
    public String getPhotosImagePath() {

        if (
                profilePhoto == null ||
                userAccountId == null
        ) {
            return null;
        }

        return "/photos/recruiter/"
                + userAccountId
                + "/"
                + profilePhoto;
    }
}