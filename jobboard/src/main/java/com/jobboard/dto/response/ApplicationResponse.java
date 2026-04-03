package com.jobboard.dto.response;

import com.jobboard.model.enums.ApplicationStatus;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationResponse {
    private Long id;
    private Long jobId;
    private Long applicantId;
    private String jobTitle;
    private String companyName;
    private String applicantName;
    private String applicantEmail;
    private String coverLetter;
    private String resumeUrl;
    private String employerNotes;
    private ApplicationStatus status;
    private LocalDateTime appliedAt;

}