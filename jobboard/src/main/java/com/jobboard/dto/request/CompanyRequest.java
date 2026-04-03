package com.jobboard.dto.request;
import com.jobboard.model.enums.CompanySize;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRequest {
    @NotBlank(message = "Company name is requires")
    private String name;
    private String description;
    private String industry;
    private String website;
    private String logoUrl;
    private String location;
    private CompanySize size;
}