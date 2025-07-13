package com.example.spring_first_project.Model;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class RecruiterProfile {



        @Id
        private Long id;

        @OneToOne
        @MapsId
        private User user;

        private String companyName;
        private String companyWebsite;
        private String designation;
        private String aboutCompany;
//       @OneToMany(mappedBy = "recruiter", cascade = CascadeType.ALL, orphanRemoval = true)
//       private List<JobPost> jobs = new ArrayList<>();


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyWebsite() {
        return companyWebsite;
    }

    public void setCompanyWebsite(String companyWebsite) {
        this.companyWebsite = companyWebsite;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getAboutCompany() {
        return aboutCompany;
    }

    public void setAboutCompany(String aboutCompany) {
        this.aboutCompany = aboutCompany;
    }

//    public List<JobPost> getJobs() {
//        return jobs;
//    }
//
//    public void setJobs(List<JobPost> jobs) {
//        this.jobs = jobs;
//    }


    public RecruiterProfile(Long id, User user, String companyName, String companyWebsite, String designation, String aboutCompany) {
        this.id = id;
        this.user = user;
        this.companyName = companyName;
        this.companyWebsite = companyWebsite;
        this.designation = designation;
        this.aboutCompany = aboutCompany;
    }

    public RecruiterProfile(){

    }
}


