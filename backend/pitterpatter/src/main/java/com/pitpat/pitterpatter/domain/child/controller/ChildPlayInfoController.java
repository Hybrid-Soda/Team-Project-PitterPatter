package com.pitpat.pitterpatter.domain.child.controller;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildMaxScoreDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildPlayInfoResponseDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildScoreResponseDTO;
import com.pitpat.pitterpatter.domain.child.service.ChildPlayInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/child")
@RequiredArgsConstructor
public class ChildPlayInfoController {

    private final ChildPlayInfoService childPlayInfoService;

    @GetMapping("/{childId}/playtime/{startDate}/{endDate}")
    public ResponseEntity<List<ChildPlayInfoResponseDTO>> getPlayRecordsByDateRange(
            @PathVariable Long childId,
            @PathVariable String startDate,
            @PathVariable String endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.parse(startDate + " 00:00:00", formatter);
        LocalDateTime end = LocalDateTime.parse(endDate + " 23:59:59", formatter);

        List<ChildPlayInfoResponseDTO> playRecords = childPlayInfoService.getPlayTimeByDateRange(childId, start, end);
        return new ResponseEntity<>(playRecords, HttpStatus.OK);
    }

    @GetMapping("/{childId}/score/{startDate}/{endDate}")
    public ResponseEntity<ChildScoreResponseDTO> getChildScoreInfo(
            @PathVariable Long childId,
            @PathVariable String startDate,
            @PathVariable String endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.parse(startDate + " 00:00:00", formatter);
        LocalDateTime end = LocalDateTime.parse(endDate + " 23:59:59", formatter);

        ChildScoreResponseDTO childScoreInfo = childPlayInfoService.getChildScoreInfo(childId, start, end);
        return new ResponseEntity<>(childScoreInfo, HttpStatus.OK);
    }
}
