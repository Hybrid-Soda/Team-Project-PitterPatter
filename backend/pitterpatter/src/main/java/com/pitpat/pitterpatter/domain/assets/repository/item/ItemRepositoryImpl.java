package com.pitpat.pitterpatter.domain.assets.repository.item;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.Item;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class ItemRepositoryImpl implements ItemRepositoryCustom{

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    @Override
    public Map<Item, Child> findItemByItem(Long itemId, Long childId) {
        Item item = em.find(Item.class, itemId);
        Child child = em.find(Child.class, childId);
        if (item == null || child == null) {
            return null;
        }
        Map<Item, Child> itemChildMap = new HashMap<>();
        itemChildMap.put(item, child);
        return itemChildMap;
    }
}
