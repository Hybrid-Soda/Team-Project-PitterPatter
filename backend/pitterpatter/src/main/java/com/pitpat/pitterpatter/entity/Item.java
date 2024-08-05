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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long id;

    @Column(name = "item_name")
    private String itemName;

    private int price;

    private String photo;

    @Enumerated(EnumType.STRING)
    @Column(name = "item_type")
    private ItemType itemType;

    private String category;

    @OneToMany(mappedBy = "item", fetch = FetchType.LAZY)
    private List<ChildItem> childItems = new ArrayList<>();

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public Item(String itemName, int price, String photo, ItemType itemType, String category) {
        this.itemName = itemName;
        this.price = price;
        this.photo = photo;
        this.itemType = itemType;
        this.category = category;
    }
}
