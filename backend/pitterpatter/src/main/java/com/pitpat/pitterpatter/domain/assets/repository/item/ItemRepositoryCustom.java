package com.pitpat.pitterpatter.domain.assets.repository.item;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.Item;

import java.util.Map;

public interface ItemRepositoryCustom {
    Map<Item, Child> findItemByItem(Long itemId, Long childId);
}
