package com.jobboard.controller;

import com.jobboard.service.ExternalJobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/external-jobs")
public class ExternalJobController {
    private final ExternalJobService externalJobService;

    public ExternalJobController(ExternalJobService externalJobService) {
        this.externalJobService = externalJobService;
    }
    @GetMapping("/search")
    public ResponseEntity<String> searchJobs(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false, defaultValue = "") String location,
            @RequestParam(required = false, defaultValue = "1") int page)
    {
                String result = externalJobService.searchJobs(keyword,location,page);
                return ResponseEntity.ok(result);
    }
}