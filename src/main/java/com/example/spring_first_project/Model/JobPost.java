package com.example.spring_first_project.Model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity
public class JobPost {


        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String name;
        private String email;
        private String phone;

        private String job_title;
        private String description;

        private String job_type;// "Full-time", "Internship", etc.
        private String company;
        private String salary;
        private String location;

        private String qualification;
    @ElementCollection
    @CollectionTable(name = "job_post_skills_required", joinColumns = @JoinColumn(name = "job_post_id"))
    @Column(name = "skill")
        private List<String> skills_required;


    @ManyToOne
     @JoinColumn(name="recruiter_id")
    private RecruiterProfile recruiter;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getJob_title() {
        return job_title;
    }

    public void setJob_title(String job_title) {
        this.job_title = job_title;
    }



    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }


    public String getSalary() {
        return salary;
    }

    public void setSalary(String salary) {
        this.salary = salary;
    }



    public RecruiterProfile getRecruiter() {
        return recruiter;
    }

    public void setRecruiter(RecruiterProfile recruiter) {
        this.recruiter = recruiter;

    }

    public String getJob_type() {
        return job_type;
    }

    public void setJob_type(String job_type) {
        this.job_type = job_type;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

//    public boolean isFeatured() {
//        return featured;
//    }
//
//    public void setFeatured(boolean featured) {
//        this.featured = featured;
//    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public List<String> getSkills_required() {
        return skills_required;
    }

    public void setSkills_required(List<String> skills_required) {
        this.skills_required = skills_required;
    }

    public JobPost(Long id, String name, String email, String phone, String job_title, String description, String job_type, String company, String salary, String location, String qualification, List<String> skills_required, RecruiterProfile recruiter) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.job_title = job_title;
        this.description = description;
        this.job_type = job_type;
        this.company = company;
        this.salary = salary;
        this.location = location;
        this.qualification = qualification;
        this.skills_required = skills_required;
        this.recruiter=recruiter;
    }

    public JobPost(){

    }
}
