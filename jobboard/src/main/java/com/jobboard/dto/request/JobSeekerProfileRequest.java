package com.jobboard.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class JobSeekerProfileRequest {
    private String haedline;
    private String summary;
    private String skills;
    private String resumeUrl;
    private String phone;
    private String location;
    private String linkedinUrl;
    private String portfolioUrl;
    private Integer experienceYears;
}