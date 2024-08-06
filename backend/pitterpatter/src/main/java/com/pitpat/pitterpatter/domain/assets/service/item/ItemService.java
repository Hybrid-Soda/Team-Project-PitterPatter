package com.pitpat.pitterpatter.domain.assets.service.item;

import com.pitpat.pitterpatter.domain.assets.model.dto.item.CreateItemDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.item.FindItemDto;
import com.pitpat.pitterpatter.domain.assets.model.dto.item.FindItemListDto;
import com.pitpat.pitterpatter.domain.assets.repository.item.ItemRepository;
import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.ChildItem;
import com.pitpat.pitterpatter.entity.Item;
import com.pitpat.pitterpatter.entity.enums.ItemType;
import com.pitpat.pitterpatter.global.exception.exceptions.EntityNotFoundException;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.pitpat.pitterpatter.entity.QChildItem.childItem;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final JPAQueryFactory queryFactory;

    @Transactional
    public CreateItemDto createItem(String itemName, int price, String photo, ItemType itemType, String category) {
        Item item = new Item(itemName, price, photo, itemType, category);
        itemRepository.save(item);
        return new CreateItemDto(itemName, price, photo, itemType, category);
    }

    public List<FindItemListDto> findAll(Long childId) {
        List<Item> items = itemRepository.findAll();
        if (items == null || items.isEmpty()) {
            return new ArrayList<>();
        }

        List<FindItemListDto> itemList = new ArrayList<>();
        for (Item item : items) {
            Map<Item, Child> itemByItem = itemRepository.findItemByItem(item.getId(), childId);
            Child child = itemByItem.get(item);
            ChildItem childItem1 = queryFactory
                    .selectFrom(childItem)
                    .where(childItem.child.eq(child),
                            childItem.item.eq(item))
                    .fetchOne();
            if (childItem1 == null) {
                itemList.add(new FindItemListDto(
                        item.getId(),
                        item.getItemName(),
                        item.getPrice(),
                        item.getPhoto(),
                        item.getItemType(),
                        item.getCategory(),
                        false,
                        false
                ));
            } else {
                itemList.add(new FindItemListDto(
                        item.getId(),
                        item.getItemName(),
                        item.getPrice(),
                        item.getPhoto(),
                        item.getItemType(),
                        item.getCategory(),
                        childItem1.isOn(),
                        true
                ));
            }
        }
        return itemList;
    }



    public FindItemDto findItemByItemId(Long itemId, Long childId) {
        Map<Item, Child> itemByItem = itemRepository.findItemByItem(itemId, childId);
        if (itemByItem.isEmpty()) {
            throw new EntityNotFoundException("해당 자녀가 아이템을 보유하고 있지 않습니다.");
        }
        Item item = itemByItem.keySet().iterator().next();
        Child child = itemByItem.get(item);
        ChildItem childItem1 = queryFactory
                .selectFrom(childItem)
                .where(childItem.child.eq(child),
                        childItem.item.eq(item))
                .fetchOne();
        return new FindItemDto(item.getId(),
                item.getItemName(),
                item.getPrice(),
                item.getPhoto(),
                childItem1.isOn());
    }
}
