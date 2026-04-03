package com.jobboard.controller;

import com.jobboard.dto.request.CompanyRequest;
import com.jobboard.dto.response.CompanyResponse;
import com.jobboard.dto.response.ApiResponse;
import com.jobboard.model.Company;
import com.jobboard.service.CompanyService;
import com.jobboard.security.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/companies")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;

    @PostMapping
    public ResponseEntity<CompanyResponse> createCompany(
            @Valid @RequestBody CompanyRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        CompanyResponse response = companyService.createCompany(request,userDetails.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping
    public ResponseEntity<List<CompanyResponse>> getAllCompanies(){
        List<CompanyResponse> companies = companyService.getAllCompanies();
        return ResponseEntity.ok(companies);
    }
    @GetMapping("/{id}")
    public ResponseEntity<CompanyResponse> getCompaniesById(@PathVariable Long id){
        CompanyResponse response = companyService.getCompanyById(id);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/my-companies")
    public ResponseEntity<List<CompanyResponse>> getMyCompanies(
            @AuthenticationPrincipal CustomUserDetails userDetails){
        List<CompanyResponse> companies = companyService.getMyCompanies(userDetails.getId());
        return ResponseEntity.ok(companies);
    }
    @PutMapping("/{id}")
    public ResponseEntity<CompanyResponse> updateCompany(
            @PathVariable long id,
            @Valid @RequestBody CompanyRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        CompanyResponse response = companyService.updateCompany(id,request,userDetails.getId());
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCompany(
            @PathVariable long id,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        companyService.deleteCompany(id,userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Company deleted successfully"));
    }
}
