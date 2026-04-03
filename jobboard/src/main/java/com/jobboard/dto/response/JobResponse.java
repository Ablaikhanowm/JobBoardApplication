package com.jobboard.dto.response;

import com.jobboard.model.enums.ExperienceLevel;
import com.jobboard.model.enums.JobStatus;
import com.jobboard.model.enums.JobType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse{
    private Long id;
    private String title;
    private String description;
    private String requirements;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private String location;
    private JobType jobType;
    private ExperienceLevel experienceLevel;
    private JobStatus status;
    private LocalDateTime deadline;
    private LocalDateTime updatedAt;
    private LocalDateTime createdAt;

    private Long companyId;
    private String companyName;
    private String companyLogoUrl;
}