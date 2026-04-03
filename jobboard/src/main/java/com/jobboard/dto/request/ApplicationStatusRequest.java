package com.jobboard.dto.request;

import com.jobboard.model.enums.ApplicationStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationStatusRequest{
    @NotNull(message = "Status is required")
    private ApplicationStatus status;
    private String employerNotes;
}