package com.jobboard.service;

import com.jobboard.dto.request.JobRequest;
import com.jobboard.dto.response.JobResponse;
import com.jobboard.exception.ResourceNotFoundException;
import com.jobboard.exception.UnauthorizedException;
import com.jobboard.model.Company;
import com.jobboard.model.Job;
import com.jobboard.model.enums.ExperienceLevel;
import com.jobboard.model.enums.JobStatus;
import com.jobboard.model.enums.JobType;
import com.jobboard.repository.CompanyRepository;
import com.jobboard.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.message.AsynchronouslyFormattable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JobService{
    private final JobRepository jobRepository;
    private final CompanyRepository companyRepository;

    @Transactional
    public JobResponse createJob(JobRequest request, Long userId){
        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(()-> new ResourceNotFoundException("Company", "id", request.getCompanyId()));
        if(!company.getOwner().getId().equals(userId)){
            throw new UnauthorizedException("You can only post jobs for your own companies");
        }

        Job job = new Job();
        job.setCompany(company);
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setRequirements(request.getRequirements());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setDeadline(request.getDeadline());
        job.setStatus(JobStatus.OPEN);

        Job savedJob =jobRepository.save(job);
        return mapToResponse(savedJob);
    }

    public List<JobResponse> getAllOpenJobs(){
        return jobRepository.findByStatus(JobStatus.OPEN)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    public JobResponse getJobById(Long id){
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
        return mapToResponse(job);
    }
    public List<JobResponse> getJobsByCompany(Long companyId){
        return jobRepository.findByCompanyIdAndStatus(companyId, JobStatus.OPEN)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    public List<JobResponse> searchJobs(String keyword, String location, JobType jobType, ExperienceLevel experienceLevel){
        return jobRepository.searchJobs(keyword, location, jobType, experienceLevel)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public JobResponse updateJob(Long jobId, JobRequest request, Long userId){
        Job job = jobRepository.findById(jobId)
                .orElseThrow(()-> new ResourceNotFoundException("Job", "id", jobId));
        if(!job.getCompany().getOwner().getId().equals(userId)){
            throw new UnauthorizedException("You can only update jobs for your own compainies");
        }
        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setRequirements(request.getRequirements());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setLocation(request.getLocation());
        job.setJobType(request.getJobType());
        job.setDeadline(request.getDeadline());

        Job updatedJob = jobRepository.save(job);
        return mapToResponse(updatedJob);
    }

    @Transactional
    public JobResponse updateJobStatus(Long jobId, JobStatus jobStatus, Long userId){
        Job job = jobRepository.findById(jobId)
                .orElseThrow(()-> new ResourceNotFoundException("Job","id", jobId));

        if(!job.getCompany().getOwner().getId().equals(userId)){
            throw new UnauthorizedException("You can only update jobs for your own companies");
        }
        job.setStatus(jobStatus);
        Job updatedJob = jobRepository.save(job);
        return mapToResponse(updatedJob);
    }

    @Transactional
    public void deleteJob(Long jobId, Long userId){
        Job job = jobRepository.findById(jobId)
                .orElseThrow(()-> new ResourceNotFoundException("Job", "id", jobId));
        if(!job.getCompany().getOwner().getId().equals(userId)){
            throw new UnauthorizedException("You can only delete jobs for your own companies");
        }
        jobRepository.delete(job);
    }

    private JobResponse mapToResponse(Job job){
        JobResponse response = new JobResponse();
        response.setId(job.getId());
        response.setTitle(job.getTitle());
        response.setDescription(job.getDescription());
        response.setRequirements(job.getRequirements());
        response.setSalaryMax(job.getSalaryMax());
        response.setSalaryMin(job.getSalaryMin());
        response.setLocation(job.getLocation());
        response.setJobType(job.getJobType());
        response.setExperienceLevel(job.getExperienceLevel());
        response.setStatus(job.getStatus());
        response.setDeadline(job.getDeadline());
        response.setCreatedAt(job.getCreatedAt());
        response.setCompanyId(job.getCompany().getId());
        response.setCompanyName(job.getCompany().getName());
        response.setCompanyLogoUrl(job.getCompany().getLogoUrl());
        return response;
    }
}