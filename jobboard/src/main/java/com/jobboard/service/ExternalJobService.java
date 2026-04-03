package com.jobboard.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service

public class ExternalJobService {
    @Value("${adzuna.app.id}")
    private String appId;
    @Value("${adzuna.app.key}")
    private String appKey;
    private RestTemplate restTemplate;

    public ExternalJobService(){
        this.restTemplate = new RestTemplate();
    }
    public String searchJobs(String keyword, String location, int page){
        String country = "us";

        String url = String.format(
                "https://api.adzuna.com/v1/api/jobs/%s/search/%d?app_id=%s&app_key=%s&what=%s&where=%s&results_per_page=10",
                country,
                page,
                appId,
                appKey,
                keyword != null ? keyword : "",
                location != null ? location : ""
        );

        try{
            return restTemplate.getForObject(url, String.class);
        } catch(Exception e){
            return "{\"results\":[], \"error\": \"" + e.getMessage() + "\"}";
        }
    }
}