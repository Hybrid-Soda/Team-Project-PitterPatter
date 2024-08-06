package com.pitpat.pitterpatter.domain.assets.model.dto.item;

import com.pitpat.pitterpatter.entity.enums.ItemType;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class FindItemListDto {
    private Long id;
    private String itemName;
    private int price;
    private String photo;
    private ItemType itemType;
    private String category;
    @Column(name = "is_on")
    private boolean isOn;
    private boolean has;
}
