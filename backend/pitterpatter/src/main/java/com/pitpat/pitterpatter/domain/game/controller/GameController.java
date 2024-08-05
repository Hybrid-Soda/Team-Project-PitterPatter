package com.pitpat.pitterpatter.domain.game.controller;

import com.pitpat.pitterpatter.domain.game.model.dto.GameResultRequestDTO;
import com.pitpat.pitterpatter.domain.game.service.GameResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@RequiredArgsConstructor
public class GameController {

    private final GameResultService gameResultService;

    @PostMapping("/{childId}")
    public ResponseEntity<Boolean> addGameResult(@PathVariable("childId") Long childId, @Valid @RequestBody GameResultRequestDTO gameResultRequestDTO) {
        boolean isFirstPlayToday = gameResultService.addGameResult(childId, gameResultRequestDTO);
        return new ResponseEntity<>(isFirstPlayToday, HttpStatus.OK);
    }
}
