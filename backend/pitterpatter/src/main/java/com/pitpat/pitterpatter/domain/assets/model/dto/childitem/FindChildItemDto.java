package com.pitpat.pitterpatter.domain.assets.model.dto.childitem;

import com.pitpat.pitterpatter.entity.enums.ItemType;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FindChildItemDto {
    private Long id;
    private String itemName;
    private String photo;
    private ItemType itemType;
    private String category;
}
