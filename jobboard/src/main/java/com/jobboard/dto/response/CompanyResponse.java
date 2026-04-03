package com.jobboard.dto.response;

import com.jobboard.model.enums.CompanySize;
import com.jobboard.model.enums.CompanyStatus;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyResponse {
    private Long id;
    private String name;
    private String description;
    private String indsutry;
    private String website;
    private String logoUrl;
    private String location;
    private CompanySize size;
    private CompanyStatus status;
    private Long ownerId;
    private String ownerName;
    private LocalDateTime createdAt;
}