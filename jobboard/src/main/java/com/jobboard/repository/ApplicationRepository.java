package com.jobboard.repository;

import com.jobboard.model.Application;
import com.jobboard.model.enums.ApplicationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByApplicantId(Long applicantId);
    List<Application> findByJobId(Long jobId);
    List<Application> findByJobIdAndStatus(Long jobId, ApplicationStatus status);
    Optional<Application> findByJobIdAndApplicantId(Long applicantId, Long jobId);

    boolean existsByApplicantIdAndJobId(Long applicantId, Long jobId);

    @Query("SELECT a FROM Application a WHERE a.job.company.owner.id = :employerId")
    List<Application> findByEmployerId(@Param("employerId") Long employerId);

    @Query("SELECT COUNT(a) FROM Application a WHERE a.job.id = :jobId")
    Long countByJobId(@Param("jobId") Long jobId);
}