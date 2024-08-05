package com.pitpat.pitterpatter.domain.assets.model.dto.item;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class FindItemDto {
    // id 아이템 이미지, 가격, 소유, 착용
    private Long id;
    private String itemName;
    private int price;
    private String photo;
    @Column(name = "is_on")
    private boolean isOn;
}
