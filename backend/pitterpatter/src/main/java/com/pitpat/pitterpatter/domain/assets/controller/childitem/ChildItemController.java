package com.pitpat.pitterpatter.domain.assets.controller.childitem;

import com.pitpat.pitterpatter.domain.assets.model.dto.childitem.FindChildItemDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.childitem.PurchaseResult;
import com.pitpat.pitterpatter.domain.assets.service.childitem.ChildItemService;
import com.pitpat.pitterpatter.global.exception.exceptions.AlreadyHaveItemException;
import com.pitpat.pitterpatter.global.exception.exceptions.EntityNotFoundException;
import com.pitpat.pitterpatter.global.exception.ErrorResponseDto;
import com.pitpat.pitterpatter.global.exception.exceptions.InsufficientPointsException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/assets/item-property")
@RequiredArgsConstructor
@Slf4j
public class ChildItemController {

    private final ChildItemService childItemService;

    // 소유 아이템 리스트 조회
    @GetMapping("/{child_id}")
    public ResponseEntity<?> haveItems(@PathVariable("child_id") Long childId) {
        try {
            List<FindChildItemDto> items = childItemService.haveItems(childId);
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto("아이템 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // 착용 아이템 리스트 조회
    @GetMapping("/{child_id}/on")
    public ResponseEntity<?> isOnItems(@PathVariable("child_id") Long childId) {
        try {
            List<FindChildItemDto> items = childItemService.isOnItems(childId);
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto("착용 아이템 조회 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // 아이템 버리기
    @DeleteMapping("/{child_id}/{item_id}")
    public ResponseEntity<?> throwOutItem(@PathVariable("child_id") Long childId, @PathVariable("item_id") Long itemId) {
        try {
            Boolean deletedItem = childItemService.throwOutItem(childId, itemId);
            if (deletedItem == null || !deletedItem) {
                ErrorResponseDto errorResponse = new ErrorResponseDto("아이템을 찾을 수 없거나 삭제할 수 없습니다");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("msg", "아이템이 제거되었습니다.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto("아이템 제거 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // 아이템 구매
    @PostMapping("/{child_id}/{item_id}")
    public ResponseEntity<?> buyItem(@PathVariable("child_id") Long childId, @PathVariable("item_id") Long itemId) {
        try {
            PurchaseResult result = childItemService.buyItem(childId, itemId);
            Map<String, Object> response = new HashMap<>();
            response.put("msg", "아이템 구매 성공");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (EntityNotFoundException e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto(e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (InsufficientPointsException e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        } catch (AlreadyHaveItemException e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto(e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto("아이템 구매 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    // 아이템 탈착
    @PatchMapping("{child_id}/on/{item_id}")
    public ResponseEntity<?> toggleItem(@PathVariable("child_id") Long childId, @PathVariable("item_id") Long itemId) {
        try {
            Boolean isOn = childItemService.toggleItem(childId, itemId);
            if (isOn == null) {
                ErrorResponseDto errorResponse = new ErrorResponseDto("아이템을 찾을 수 없거나 토글할 수 없습니다");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("msg", isOn ? "아이템이 착용되었습니다" : "아이템이 해제되었습니다");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ErrorResponseDto errorResponse = new ErrorResponseDto("아이템 토글 실패: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
}
