package com.jobboard.service;

import com.jobboard.dto.request.CompanyRequest;
import com.jobboard.dto.response.CompanyResponse;
import com.jobboard.exception.BadRequestException;
import com.jobboard.exception.ResourceNotFoundException;
import com.jobboard.exception.UnauthorizedException;
import com.jobboard.model.Company;
import com.jobboard.model.User;
import com.jobboard.model.enums.CompanyStatus;
import com.jobboard.model.enums.Role;
import com.jobboard.repository.CompanyRepository;
import com.jobboard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class CompanyService{
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Transactional
    public CompanyResponse createCompany(CompanyRequest request, Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        if(user.getRole() != Role.EMPLOYER){
            throw new UnauthorizedException("Only employers can create companies");
        }
        if(companyRepository.existsByNameIgnoreCase(request.getName())){
            throw new BadRequestException("Company with this name already exists");
        }

        Company company = new Company();
        company.setOwner(user);
        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setIndustry(request.getIndustry());
        company.setWebsite(request.getWebsite());
        company.setLogoUrl(request.getLogoUrl());
        company.setLocation(request.getLocation());
        company.setSize(request.getSize());
        company.setStatus(CompanyStatus.APPROVED);

        Company savedCompany = companyRepository.save(company);
        return mapToResponse(savedCompany);
    }

    public List<CompanyResponse> getAllCompanies(){
        List<Company> companies = companyRepository.findByStatus(CompanyStatus.APPROVED);
        return companies.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    public CompanyResponse getCompanyById(Long id){
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company","id", id));
        return mapToResponse(company);
    }
    public List<CompanyResponse> getMyCompanies(Long userId){
        return companyRepository.findByOwnerId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public CompanyResponse updateCompany(Long companyId, CompanyRequest request,Long userId){
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new ResourceNotFoundException("Company", "id", companyId));

        if(!company.getOwner().getId().equals(userId)){
            throw new UnauthorizedException("You can onlu update your own companies");
        }

        company.setName(request.getName());
        company.setDescription(request.getDescription());
        company.setIndustry(request.getIndustry());
        company.setWebsite(request.getWebsite());
        company.setLogoUrl(request.getLogoUrl());
        company.setLocation(request.getLocation());
        company.setSize(request.getSize());

        Company updatedCompany = companyRepository.save(company);
        return mapToResponse(updatedCompany);
    }

    @Transactional
    public void deleteCompany(Long companyId, Long userId){
        Company company = companyRepository.findById(companyId)
                .orElseThrow(()-> new ResourceNotFoundException("Company", "id", companyId));

        if(!company.getOwner().getId().equals(userId)){
            throw new UnauthorizedException("You can only delete your own companies");
        }
        companyRepository.delete(company);
    }

    private CompanyResponse mapToResponse(Company company){
        CompanyResponse response = new CompanyResponse();
        response.setId(company.getId());
        response.setName(company.getName());
        response.setDescription(company.getDescription());
        response.setIndsutry(company.getIndustry());
        response.setLogoUrl(company.getLogoUrl());
        response.setWebsite(company.getWebsite());
        response.setLocation(company.getLocation());
        response.setSize(company.getSize());
        response.setOwnerId(company.getOwner().getId());
        response.setStatus(company.getStatus());
        response.setOwnerName(company.getOwner().getFirstName() + " " + company.getOwner().getLastName());
        response.setCreatedAt(company.getCreatedAt());
        return response;


    }
}