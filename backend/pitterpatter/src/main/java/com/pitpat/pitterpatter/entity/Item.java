package com.pitpat.pitterpatter.entity;

import com.pitpat.pitterpatter.entity.enums.ItemType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;

    private String itemName;

    private int price;

    private String photo;

    @Enumerated(EnumType.STRING)
    private ItemType itemType;

    private String category;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    private List<ChildItem> childItems = new ArrayList<>();

    @CreatedDate
    private LocalDateTime created_at;

    public Item(int price, ItemType itemType, String category) {
        this.price = price;
        this.itemType = itemType;
        this.category = category;
    }
}
