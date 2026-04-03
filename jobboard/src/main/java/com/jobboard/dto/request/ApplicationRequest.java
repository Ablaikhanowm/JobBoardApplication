package com.jobboard.dto.request;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationRequest {
    @NotNull(message = "Job ID is required")
    private Long jobId;
    private String coverLetter;
    private String resumeUrl;
}