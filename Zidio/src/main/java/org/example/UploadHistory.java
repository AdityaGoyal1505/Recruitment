package org.example;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
public class UploadHistory {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private User user;
    private String fileName;
    private LocalDateTime uploadedAt;
    private String chartTypeGenerated;

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

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public LocalDateTime getUploadedAt() {
        return uploadedAt;
    }

    public void setUploadedAt(LocalDateTime uploadedAt) {
        this.uploadedAt = uploadedAt;
    }

    public String getChartTypeGenerated() {
        return chartTypeGenerated;
    }

    public void setChartTypeGenerated(String chartTypeGenerated) {
        this.chartTypeGenerated = chartTypeGenerated;
    }

    @Override
    public String toString() {
        return "UploadHistory{" +
                "id=" + id +
                ", user=" + user +
                ", fileName='" + fileName + '\'' +
                ", uploadedAt=" + uploadedAt +
                ", chartTypeGenerated='" + chartTypeGenerated + '\'' +
                '}';
    }
}
