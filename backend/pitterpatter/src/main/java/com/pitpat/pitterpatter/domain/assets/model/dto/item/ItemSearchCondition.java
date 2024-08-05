package com.pitpat.pitterpatter.domain.assets.model.dto.item;

import com.pitpat.pitterpatter.entity.enums.ItemType;
import lombok.Data;

@Data
public class ItemSearchCondition {
    private String itemName;
    private Integer priceGoe;
    private Integer priceLoe;
    private ItemType itemType;
    private String category;
}
