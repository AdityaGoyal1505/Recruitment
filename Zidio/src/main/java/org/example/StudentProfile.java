package org.example;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

@Entity
public class StudentProfile {

    @Id
    private Long userId; // also foreign key
    @OneToOne
    @MapsId
    private User user;
    private String university;
    private String degree;
    private int yearOfStudy;
    private String resumeUrl;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUniversity() {
        return university;
    }

    public void setUniversity(String university) {
        this.university = university;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public int getYearOfStudy() {
        return yearOfStudy;
    }

    public void setYearOfStudy(int yearOfStudy) {
        this.yearOfStudy = yearOfStudy;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    @Override
    public String toString() {
        return "StudentProfile{" +
                "userId=" + userId +
                ", user=" + user +
                ", university='" + university + '\'' +
                ", degree='" + degree + '\'' +
                ", yearOfStudy=" + yearOfStudy +
                ", resumeUrl='" + resumeUrl + '\'' +
                '}';
    }
}
