package com.jobboard.service;

import com.jobboard.dto.request.ApplicationRequest;
import com.jobboard.dto.request.ApplicationStatusRequest;
import com.jobboard.dto.response.ApplicationResponse;
import com.jobboard.exception.UnauthorizedException;
import com.jobboard.exception.ResourceNotFoundException;
import com.jobboard.exception.BadRequestException;
import com.jobboard.model.Application;
import com.jobboard.model.Job;
import com.jobboard.model.User;
import com.jobboard.model.enums.JobStatus;
import com.jobboard.model.enums.ApplicationStatus;
import com.jobboard.model.enums.Role;
import com.jobboard.repository.ApplicationRepository;
import com.jobboard.repository.JobRepository;
import com.jobboard.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ApplicationService {
    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    public ApplicationService(ApplicationRepository applicationRepository, JobRepository jobRepository, UserRepository userRepository) {
        this.applicationRepository = applicationRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
    }
    @Transactional
    public ApplicationResponse applyToJob(ApplicationRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(()-> new ResourceNotFoundException("User", "id", userId));

        if(user.getRole() != Role.JOB_SEEKER){
            throw new UnauthorizedException("Only job seekers can apply to jobs");
        }

        Job job = jobRepository.findById(request.getJobId())
                .orElseThrow(()-> new ResourceNotFoundException("Job", "id", request.getJobId()));

        if(job.getStatus() != JobStatus.OPEN){
            throw new BadRequestException("This job is not accepting applications");
        }
        if(applicationRepository.existsByApplicantIdAndJobId(job.getId(), userId)){
            throw new BadRequestException("You have already applied to this job");
        }

        Application application = new Application();
        application.setJob(job);
        application.setApplicant(user);
        application.setCoverLetter(request.getCoverLetter());
        application.setResumeUrl(request.getResumeUrl());
        application.setStatus(ApplicationStatus.PENDING);

        Application savedApplication =  applicationRepository.save(application);
        return mapToResponse(savedApplication);
    }

    public List<ApplicationResponse> getMyApplications(Long userId){
        List<Application> applications = applicationRepository.findByApplicantId(userId);
        return applications.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getApplicationsForJob(Long jobId, Long userId){
        Job job = jobRepository.findById(jobId)
                .orElseThrow(()-> new ResourceNotFoundException("Job", "id", jobId));

        if(!job.getCompany().getOwner().getId().equals(userId)){
            throw new UnauthorizedException("You can only view applications for your own jobs");
        }

        List<Application> applications = applicationRepository.findByJobId(jobId);
        return applications.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<ApplicationResponse> getAllApplicationsForEmployer(Long employerId){
        List<Application> applications = applicationRepository.findByEmployerId(employerId);
        return applications.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public ApplicationResponse updateApplicationStatus(Long applicationId,
                                                       ApplicationStatusRequest request,
                                                       Long userId){
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(()-> new ResourceNotFoundException("Application", "id", applicationId));

        if(!application.getJob().getCompany().getOwner().getId().equals(userId)){
            throw new UnauthorizedException("You can only update applications for your own jobs");
        }

        application.setStatus(request.getStatus());
        if (request.getEmployerNotes() != null) {
            application.setEmployerNotes(request.getEmployerNotes());
        }
        Application updatedApplication = applicationRepository.save(application);
        return mapToResponse(updatedApplication);
    }

    public ApplicationResponse getApplicationById(Long applicationId, Long userId){
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(()-> new ResourceNotFoundException("Application", "id", applicationId));

        boolean isApplicant = application.getApplicant().getId().equals(userId);
        boolean isJobOwner = application.getJob().getCompany().getOwner().getId().equals(userId);

        if(!isApplicant && !isJobOwner){
            throw new UnauthorizedException("You do not have permission to view this applicaiton");
        }
        return mapToResponse(application);
    }

    @Transactional
    public void withdrawApplication(Long applicationId, Long userId){
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(()->new ResourceNotFoundException("Application", "id", applicationId));
        if(!application.getApplicant().getId().equals(userId)){
            throw new UnauthorizedException("You can only withdraw your own application");
        }
        if(application.getStatus() != ApplicationStatus.PENDING){
            throw new BadRequestException("You can only withdraw pending applications");
        }
        applicationRepository.delete(application);
    }

    private ApplicationResponse mapToResponse(Application application){
        ApplicationResponse response = new ApplicationResponse();
        response.setId(application.getId());
        response.setJobId(application.getJob().getId());
        response.setJobTitle(application.getJob().getTitle());
        response.setCompanyName(application.getJob().getCompany().getName());
        response.setApplicantId(application.getApplicant().getId());
        response.setApplicantName(application.getApplicant().getFirstName() + " " +
                application.getApplicant().getLastName());
        response.setApplicantEmail(application.getApplicant().getEmail());
        response.setCoverLetter(application.getCoverLetter());
        response.setResumeUrl(application.getResumeUrl());
        response.setStatus(application.getStatus());
        response.setEmployerNotes(application.getEmployerNotes());
        response.setAppliedAt(application.getAppliedAt());
        return response;
    }
}