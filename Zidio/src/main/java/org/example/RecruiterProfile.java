package org.example;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

@Entity
public class RecruiterProfile {
    @Id
    private Long userId;
    @OneToOne
    @MapsId
    private User user;
    private String companyName;
    private String designation;
    private String companyWebsite;

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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    public String getCompanyWebsite() {
        return companyWebsite;
    }

    public void setCompanyWebsite(String companyWebsite) {
        this.companyWebsite = companyWebsite;
    }

    @Override
    public String toString() {
        return "RecruiterProfile{" +
                "userId=" + userId +
                ", user=" + user +
                ", companyName='" + companyName + '\'' +
                ", designation='" + designation + '\'' +
                ", companyWebsite='" + companyWebsite + '\'' +
                '}';
    }
}
