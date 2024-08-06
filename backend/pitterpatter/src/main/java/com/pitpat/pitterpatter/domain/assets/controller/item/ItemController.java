package com.pitpat.pitterpatter.domain.assets.controller.item;

import com.pitpat.pitterpatter.domain.assets.model.dto.item.FindItemDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.item.FindItemListDto;
import com.pitpat.pitterpatter.domain.assets.service.item.ItemService;
import com.pitpat.pitterpatter.global.exception.exceptions.EntityNotFoundException;
import com.pitpat.pitterpatter.global.exception.ErrorResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping("/item")
    public ResponseEntity<?> findAll(@RequestParam("child_id") Long childId) {
        try {
            List<FindItemListDto> items = itemService.findAll(childId);
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto("아이템 리스트 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @GetMapping("/item/{item_id}")
    public ResponseEntity<?> findItemByItemId(
            @PathVariable("item_id") Long itemId,
            @RequestParam("child_id") Long childId) {
        try {
            FindItemDto item = itemService.findItemByItemId(itemId, childId);
            return ResponseEntity.ok(item);
        } catch (EntityNotFoundException e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto("아이템 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
