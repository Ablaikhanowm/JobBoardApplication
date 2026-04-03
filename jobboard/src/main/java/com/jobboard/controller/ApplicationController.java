package com.jobboard.controller;

import com.jobboard.dto.request.ApplicationRequest;
import com.jobboard.dto.request.ApplicationStatusRequest;
import com.jobboard.dto.response.ApplicationResponse;
import com.jobboard.dto.response.ApiResponse;
import com.jobboard.security.CustomUserDetails;
import com.jobboard.service.ApplicationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController{
    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService){
        this.applicationService = applicationService;
    }
    @PostMapping
    public ResponseEntity<ApplicationResponse> applyToJob(
            @Valid @RequestBody ApplicationRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        ApplicationResponse response = applicationService.applyToJob(request, userDetails.getId());
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @GetMapping("/my-applications")
    public ResponseEntity<List<ApplicationResponse>> getMyApplications(
            @AuthenticationPrincipal CustomUserDetails userDetails){
        List<ApplicationResponse> applications = applicationService.getMyApplications(userDetails.getId());
        return new ResponseEntity<>(applications,HttpStatus.OK);
    }
    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForJob(
            @PathVariable Long jobId,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        List<ApplicationResponse> applications = applicationService.getApplicationsForJob(jobId, userDetails.getId());
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/employer")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsForEmployer(
            @AuthenticationPrincipal CustomUserDetails userDetails){
        List<ApplicationResponse> applications = applicationService.getAllApplicationsForEmployer(userDetails.getId());
        return new ResponseEntity<>(applications, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse> getApplicationById(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        ApplicationResponse response = applicationService.getApplicationById(id, userDetails.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateApplicationStatus(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationStatusRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        ApplicationResponse response = applicationService.updateApplicationStatus(id,request, userDetails.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteApplicationById(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        applicationService.withdrawApplication(id, userDetails.getId());
        return new ResponseEntity<>(ApiResponse.success("Application withdrawn successfully"), HttpStatus.OK);
    }

}
