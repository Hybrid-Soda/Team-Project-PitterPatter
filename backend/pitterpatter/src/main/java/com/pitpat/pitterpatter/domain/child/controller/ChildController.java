package com.pitpat.pitterpatter.domain.child.controller;

import com.pitpat.pitterpatter.domain.child.model.dto.ChildRequestDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildResponseDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildUpdateDTO;
import com.pitpat.pitterpatter.domain.child.repository.ChildRepository;
import com.pitpat.pitterpatter.domain.child.service.ChildService;
import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.global.exception.exceptions.DataNotFoundException;
import com.pitpat.pitterpatter.global.exception.exceptions.TokenExpiredException;
import com.pitpat.pitterpatter.global.exception.exceptions.UserProblemException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/child")
@RequiredArgsConstructor
public class ChildController {
    private final ChildService childService;

    @GetMapping
    public ResponseEntity<List<ChildResponseDTO>> getChildrenList(@AuthenticationPrincipal UserDetails userDetails) {
        int userId = Integer.parseInt(userDetails.getUsername());
        List<ChildResponseDTO> childrenByUserId = childService.getChildrenByUserId(userId);
        return new ResponseEntity<>(childrenByUserId, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Long> addChild(@AuthenticationPrincipal UserDetails userDetails, @Valid @RequestBody ChildRequestDTO childRequestDTO) {
        int userId = Integer.parseInt(userDetails.getUsername());
        Long childId = childService.addChild(userId, childRequestDTO);
        return new ResponseEntity<>(childId, HttpStatus.OK);
    }

    @GetMapping("/{childId}")
    public ResponseEntity<ChildResponseDTO> getChildById(@PathVariable Long childId) {
        ChildResponseDTO childResponseDTO = childService.getChildById(childId);
        return new ResponseEntity<>(childResponseDTO, HttpStatus.OK);
    }

    @PatchMapping("/{childId}")
    public ResponseEntity<Long> updateChild(@PathVariable Long childId, @Valid @RequestBody ChildUpdateDTO childUpdateDTO) {
        Long responseChildId = childService.updateChild(childId, childUpdateDTO);
        return new ResponseEntity<>(responseChildId, HttpStatus.OK);
    }

    @DeleteMapping("/{childId}")
    public ResponseEntity<Void> deleteChild(@PathVariable Long childId) {
        childService.deleteChild(childId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
