package com.pitpat.pitterpatter.domain.assets.repository.item;

import com.pitpat.pitterpatter.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Long>, ItemRepositoryCustom {

}
