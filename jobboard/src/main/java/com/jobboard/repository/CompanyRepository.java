package com.jobboard.repository;

import com.jobboard.model.Company;
import com.jobboard.model.enums.CompanyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    List<Company> findByOwnerId(Long ownerId);
    List<Company> findByStatus(CompanyStatus status);
    Optional<Company> findByIdAndOwnerId(Long id, Long ownerId);
    boolean existsByNameIgnoreCase(String name);
}

