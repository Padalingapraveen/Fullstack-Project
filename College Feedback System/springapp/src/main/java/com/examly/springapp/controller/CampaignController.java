package com.examly.springapp.controller;

import com.examly.springapp.model.Campaign;
import com.examly.springapp.repository.CampaignRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "*")
public class CampaignController {

    @Autowired
    private CampaignRepository campaignRepository;

    @GetMapping
    public ResponseEntity<List<Campaign>> getCampaigns() {
        List<Campaign> campaigns = campaignRepository.findAll();
        return ResponseEntity.ok(campaigns);
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(@RequestBody Campaign campaign) {
        Campaign saved = campaignRepository.save(campaign);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Campaign> updateCampaignStatus(@PathVariable Long id, @RequestParam boolean active) {
        Campaign campaign = campaignRepository.findById(id).orElseThrow();
        campaign.setActive(active);
        Campaign saved = campaignRepository.save(campaign);
        return ResponseEntity.ok(saved);
    }
}