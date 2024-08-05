package com.pitpat.pitterpatter.domain.child.controller;

import com.pitpat.pitterpatter.domain.child.model.dto.*;
import com.pitpat.pitterpatter.domain.child.service.ChildPhysicalService;
import com.pitpat.pitterpatter.domain.child.service.ChildService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/child")
@RequiredArgsConstructor
public class ChildPhysicalController {

    private final ChildPhysicalService childPhysicalService;

    @GetMapping("/{childId}/physical")
    public ResponseEntity<ChildPhysicalResponseDTO> getLatestPhysicalRecord(@PathVariable Long childId) {
        ChildPhysicalResponseDTO latestPhysicalRecord = childPhysicalService.getLatestPhysicalRecord(childId);
        return new ResponseEntity<>(latestPhysicalRecord, HttpStatus.OK);
    }

    @PostMapping("/{childId}/physical")
    public ResponseEntity<Void> addPhysicalRecord(@PathVariable Long childId, @Valid @RequestBody ChildPhysicalRequestDTO childPhysicalRequestDTO) {
        childPhysicalService.addPhysicalRecord(childId, childPhysicalRequestDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/{childId}/physical")
    public ResponseEntity<Void> updatePhysicalRecord(@PathVariable Long childId, @Valid @RequestBody ChildPhysicalUpdateDTO childPhysicalUpdateDTO) {
        childPhysicalService.updateChild(childId, childPhysicalUpdateDTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{childId}/physical/list")
    public ResponseEntity<List<ChildPhysicalResponseDTO>> getPhysicalRecordListByChildId(@PathVariable Long childId) {
        List<ChildPhysicalResponseDTO> latestPhysicalRecord = childPhysicalService.getPhysicalRecordListByChildId(childId);
        return new ResponseEntity<>(latestPhysicalRecord, HttpStatus.OK);
    }

    @GetMapping("/{childId}/bmi/{startDate}/{endDate}")
    public ResponseEntity<List<BMIResponseDTO>> getBMIHistory(@PathVariable Long childId,
                                                        @PathVariable LocalDate startDate,
                                                        @PathVariable LocalDate endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.parse(startDate + " 00:00:00", formatter);
        LocalDateTime end = LocalDateTime.parse(endDate + " 23:59:59", formatter);

        List<BMIResponseDTO> bmiHistory = childPhysicalService.getBMIHistory(childId, start, end);

        return new ResponseEntity<>(bmiHistory, HttpStatus.OK);
    }
}
