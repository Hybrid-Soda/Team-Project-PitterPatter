package com.pitpat.pitterpatter.domain.assets.controller;

import com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord.CreatePointRecordDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord.FindPointRecordDto;
import com.pitpat.pitterpatter.domain.assets.service.pointrecord.PointRecordService;
import com.pitpat.pitterpatter.entity.PointRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class PointRecordController {

    private final PointRecordService pointRecordService;

    // TODO : 포인트 변경 시 POINT RECORD와 CHILD POINT 동시 수정
    @PatchMapping("/point/{child_id}")
    public PointRecord createPointRecord(@RequestBody CreatePointRecordDto createPointRecordDto) {
        return pointRecordService.createPointRecord(createPointRecordDto);
    }

    @GetMapping("/point/{child_id}")
    public Integer findByPointByChild(@PathVariable("child_id") Long childId) {
        return pointRecordService.findPointByChild(childId);
    }

    @GetMapping("/point-record/{child_id}")
    public List<FindPointRecordDto> findPointRecordsByChild(@PathVariable("child_id") Long childId) {
        return pointRecordService.findPointRecordsByChild(childId);
    }

}
