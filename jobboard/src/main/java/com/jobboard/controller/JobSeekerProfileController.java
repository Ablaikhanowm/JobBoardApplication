package com.jobboard.controller;

import com.jobboard.dto.request.JobSeekerProfileRequest;
import com.jobboard.dto.response.JobSeekerProfileResponse;
import com.jobboard.service.JobSeekerProfileService;
import com.jobboard.security.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
public class JobSeekerProfileController {
    private final JobSeekerProfileService profileService;
    public JobSeekerProfileController(JobSeekerProfileService profileService) {
        this.profileService = profileService;
    }

    @PostMapping
    public ResponseEntity<JobSeekerProfileResponse> createOrUpdateProfile(
            @Valid @RequestBody JobSeekerProfileRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails){
        JobSeekerProfileResponse response = profileService.createOrUpdateProfile(request,userDetails.getId());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<JobSeekerProfileResponse> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails){
        JobSeekerProfileResponse response = profileService.getMyProfile(userDetails.getId());
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<JobSeekerProfileResponse> getProfileByUserId(@PathVariable Long userId){
        JobSeekerProfileResponse response = profileService.getProfileByUserId(userId);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
}
