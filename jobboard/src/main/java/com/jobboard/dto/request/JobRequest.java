package com.jobboard.dto.request;

import com.jobboard.model.enums.ExperienceLevel;
import com.jobboard.model.enums.JobType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobRequest {
    @NotNull(message = "Company ID is required")
    private Long companyId;
    @NotBlank(message = "Job title is required")
    private String title;
    private String description;
    private String requirements;
    private String location;
    private BigDecimal salaryMin;
    private BigDecimal salaryMax;
    private JobType jobType;
    private ExperienceLevel experienceLevel;
    private LocalDateTime deadline;


}
