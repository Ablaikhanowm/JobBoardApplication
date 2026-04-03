package com.jobboard.service;

import com.jobboard.dto.request.JobSeekerProfileRequest;
import com.jobboard.dto.response.JobSeekerProfileResponse;
import com.jobboard.dto.response.UserResponse;
import com.jobboard.exception.BadRequestException;
import com.jobboard.exception.ResourceNotFoundException;
import com.jobboard.exception.UnauthorizedException;
import com.jobboard.model.JobSeekerProfile;
import com.jobboard.model.User;
import com.jobboard.model.enums.Role;
import com.jobboard.repository.JobSeekerProfileRepository;
import com.jobboard.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JobSeekerProfileService {
    private final JobSeekerProfileRepository profileRepository;
    private final UserRepository userRepository;
    public JobSeekerProfileService(JobSeekerProfileRepository profileRepository,
                                   UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public JobSeekerProfileResponse createOrUpdateProfile(JobSeekerProfileRequest request,
                                                          Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()->new ResourceNotFoundException("User", "id", userId));
        if(user.getRole() != Role.JOB_SEEKER){
            throw new UnauthorizedException("Only job seekers can create profiles");
        }

        JobSeekerProfile profile = profileRepository.findByUserId(userId)
                .orElse(new JobSeekerProfile());

        profile.setUser(user);
        profile.setHeadline(request.getHaedline());
        profile.setSummary(request.getSummary());
        profile.setSkills(request.getSkills());
        profile.setExperienceYears(request.getExperienceYears());
        profile.setResumeUrl(request.getResumeUrl());
        profile.setPhone(request.getPhone());
        profile.setLocation(request.getLocation());
        profile.setLinkedinUrl(request.getLinkedinUrl());
        profile.setPortfolioUrl(request.getPortfolioUrl());

        JobSeekerProfile savedProfile = profileRepository.save(profile);
        return mapToResponse(savedProfile);
    }

    public JobSeekerProfileResponse getMyProfile(Long userId){
        JobSeekerProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(()->new ResourceNotFoundException("Profile", "userId", userId));
        return mapToResponse(profile);
    }
    public JobSeekerProfileResponse getProfileByUserId(Long userId){
        JobSeekerProfile profile = profileRepository.findByUserId(userId)
                .orElseThrow(()-> new ResourceNotFoundException("Profile", "userId", userId));
        return mapToResponse(profile);
    }

    private JobSeekerProfileResponse mapToResponse(JobSeekerProfile profile){
        JobSeekerProfileResponse response = new JobSeekerProfileResponse();
        response.setId(profile.getId());
        response.setUserId(profile.getUser().getId());
        response.setUserName(profile.getUser().getFirstName() +
                " " + profile.getUser().getLastName());
        response.setUserEmail(profile.getUser().getEmail());
        response.setHeadline(profile.getHeadline());
        response.setSummary(profile.getSummary());
        response.setSkills(profile.getSkills());
        response.setExperienceYears(profile.getExperienceYears());
        response.setResumeUrl(profile.getResumeUrl());
        response.setPhone(profile.getPhone());
        response.setLocation(profile.getLocation());
        response.setLinkedinUrl(profile.getLinkedinUrl());
        response.setPortfolioUrl(profile.getPortfolioUrl());
        response.setCreatedAt(profile.getCreatedAt());
        return response;
    }
}