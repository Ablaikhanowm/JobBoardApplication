package com.jobboard.dto.response;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobSeekerProfileResponse {
    private Long id;
    private Long userId;
    private String userName;
    private String userEmail;
    private String headline;
    private String summary;
    private String skills;
    private String resumeUrl;
    private String phone;
    private String location;
    private String linkedinUrl;
    private String portfolioUrl;
    private Integer experienceYears;
    private LocalDateTime createdAt;
}