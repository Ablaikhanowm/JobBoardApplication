package com.jobboard.controller;

import com.jobboard.dto.request.JobRequest;
import com.jobboard.dto.response.JobResponse;
import com.jobboard.dto.response.ApiResponse;
import com.jobboard.model.enums.ExperienceLevel;
import com.jobboard.model.enums.JobStatus;
import com.jobboard.model.enums.JobType;
import com.jobboard.service.JobService;
import com.jobboard.security.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/jobs")
@RequiredArgsConstructor
public class JobController {
    private final JobService jobService;

    @PostMapping
    public ResponseEntity<JobResponse> createJob(
            @Valid @RequestBody JobRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        JobResponse response = jobService.createJob(request, userDetails.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs(){
        List<JobResponse> jobs = jobService.getAllOpenJobs();
        return ResponseEntity.ok(jobs);
    }
    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(@PathVariable Long id){
        JobResponse response = jobService.getJobById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/company/{companyId}")
    public ResponseEntity<List<JobResponse>> getJobsByCompany(@PathVariable Long companyId) {
        List<JobResponse> jobs = jobService.getJobsByCompany(companyId);
        return ResponseEntity.ok(jobs);
    }
    @GetMapping("/search")
    public ResponseEntity<List<JobResponse>> searchJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) JobType jobType,
            @RequestParam(required = false) ExperienceLevel experienceLevel){
        List<JobResponse> jobs = jobService.searchJobs(keyword,location,jobType,experienceLevel);
        return ResponseEntity.ok(jobs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobResponse>updateJob(
            @PathVariable Long id,
            @Valid @RequestBody JobRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        JobResponse response = jobService.updateJob(id,request,userDetails.getId());
        return ResponseEntity.ok(response);
    }
    @PatchMapping("/{id}/status")
    public ResponseEntity<JobResponse> updateJobStatus(
            @PathVariable Long id,
            @RequestParam JobStatus status,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        JobResponse response = jobService.updateJobStatus(id,status,userDetails.getId());
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteJob(
            @PathVariable Long id,
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        jobService.deleteJob(id,userDetails.getId());
        return ResponseEntity.ok(ApiResponse.success("Job deleted succesfully"));
    }
}