package com.pitpat.pitterpatter.domain.assets.model.dto.childitem;

import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.Item;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateChildItemDto {
    @NotNull
    private Child child;
    @NotNull
    private Item item;

    public CreateChildItemDto(Item item, Child child) {
        this.item = item;
        this.child = child;
    }
}
