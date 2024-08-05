package com.pitpat.pitterpatter.domain.assets.repository.childitem;

import com.pitpat.pitterpatter.entity.ChildItem;
import com.pitpat.pitterpatter.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildItemRepository extends JpaRepository<ChildItem, Long>, ChildItemRepositoryCustom {

}
