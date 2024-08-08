package com.pitpat.pitterpatter.domain.assets.service.childitem;

import com.pitpat.pitterpatter.domain.assets.model.dto.childitem.FindChildItemDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.childitem.PurchaseResult;
import com.pitpat.pitterpatter.domain.assets.repository.childitem.ChildItemRepository;
import com.pitpat.pitterpatter.entity.ChildItem;
import com.pitpat.pitterpatter.entity.enums.ItemType;
import com.pitpat.pitterpatter.global.exception.exceptions.AlreadyHaveItemException;
import com.pitpat.pitterpatter.global.exception.exceptions.EntityNotFoundException;
import com.pitpat.pitterpatter.global.exception.exceptions.InsufficientPointsException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ChildItemService {

    private final ChildItemRepository childItemRepository;

    // 소유 아이템 리스트 조회
    public List<FindChildItemDto> haveItems(@PathVariable("child_id") Long childId) {
        List<ChildItem> childItems = childItemRepository.haveItems(childId);
        if (childItems.isEmpty()) {
            throw new EntityNotFoundException("보유 중인 아이템이 없습니다.");
        }
        return childItems.stream()
                .map(childItem -> new FindChildItemDto(
                        childItem.getItem().getId(),
                        childItem.getItem().getItemName(),
                        childItem.getItem().getPhoto(),
                        childItem.getItem().getItemType(),
                        childItem.getItem().getCategory()))
                .collect(Collectors.toList());
    }

    // 착용 아이템 리스트 조회
    public List<FindChildItemDto> isOnItems(@PathVariable("child_id") Long childId) {
        List<ChildItem> childItems = childItemRepository.isOnItems(childId);

        List<FindChildItemDto> result = new ArrayList<>();

        for (int i = 0; i < 2; i++) {
            result.add(null);
        }

        if (childItems.isEmpty()) {
            return result;
        }

        List<FindChildItemDto> collect = childItems.stream()
                .map(childItem -> new FindChildItemDto(
                        childItem.getItem().getId(),
                        childItem.getItem().getItemName(),
                        childItem.getItem().getPhoto(),
                        childItem.getItem().getItemType(),
                        childItem.getItem().getCategory()))
                .collect(Collectors.toList());

        for (FindChildItemDto item : collect) {
            if (ItemType.BACKGROUND.equals(item.getItemType())) {
                result.set(0, item);
            } else if (ItemType.FRAME.equals(item.getItemType())) {
                result.set(1, item);
            }
        }

        return result;
    }

    // 아이템 버리기
    @Transactional
    public Boolean throwOutItem(@PathVariable("child_id") Long childId, @PathVariable("item_id") Long itemId) {
        Boolean childItem = childItemRepository.throwOutItem(childId, itemId);
        if (childItem == null) {
            throw new EntityNotFoundException("현재 아이템을 보유하고 있지 않습니다.");
        }
        return childItem;
    }

    // 아이템 구매
    @Transactional
    public PurchaseResult buyItem(@PathVariable("child_id") Long childId, @PathVariable("item_id") Long itemId) {
        PurchaseResult result = childItemRepository.buyItem(childId, itemId);
        switch (result) {
            case ITEM_NOT_FOUND:
                throw new EntityNotFoundException("해당 자녀가 없거나 아이템이 없습니다.");
            case ALREADY_OWNED:
                throw new AlreadyHaveItemException("해당 아이템은 구매한 아이템입니다.");
            case INSUFFICIENT_POINTS:
                throw new InsufficientPointsException("포인트가 부족합니다.");
            case SUCCESS:
                return result;
            default:
                throw new IllegalStateException("Unexpected value: " + result);
        }
    }

    // 아이템 탈착
    @Transactional
    public Boolean toggleItem(@PathVariable("child_id") Long childId, @PathVariable("item_id") Long itemId) {
        Boolean toggleItem = childItemRepository.toggleItem(childId, itemId);
        if (toggleItem == null) {
            throw new EntityNotFoundException("해당 자녀가 아이템을 보유하고 있지 않습니다.");
        }
        return toggleItem;
    }
}
