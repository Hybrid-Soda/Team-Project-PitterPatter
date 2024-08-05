package com.pitpat.pitterpatter.domain.assets.repository.childitem;

import com.pitpat.pitterpatter.domain.assets.model.dto.childitem.PurchaseResult;
import com.pitpat.pitterpatter.domain.assets.model.dto.pointrecord.CreatePointRecordDto;
import com.pitpat.pitterpatter.entity.*;
import com.pitpat.pitterpatter.entity.enums.ItemType;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.pitpat.pitterpatter.entity.QChildItem.childItem;
import static com.pitpat.pitterpatter.entity.QItem.item;

@RequiredArgsConstructor
public class ChildItemRepositoryImpl implements ChildItemRepositoryCustom {

    private final EntityManager em;
    private final JPAQueryFactory queryFactory;

    // 아이템 구매
    @Override
    public PurchaseResult buyItem(Long childId, Long itemId) {
        // Child와 Item 엔티티 조회
        Child child = em.find(Child.class, childId);
        Item item = em.find(Item.class, itemId);

        if (child == null || item == null) {
            return PurchaseResult.ITEM_NOT_FOUND;
        }

        // 아이템이 이미 소유되었는지 확인
        boolean alreadyOwned = child.getChildItems().stream()
                .anyMatch(childItem -> childItem.getItem().getId().equals(itemId));

        if (alreadyOwned) {
            return PurchaseResult.ALREADY_OWNED;
        }

        // 자녀가 가지고 있는 포인트 확인
        if (child.getPoint() < item.getPrice()) {
            return PurchaseResult.INSUFFICIENT_POINTS;
        }

        // 포인트 기록 생성
        CreatePointRecordDto createPointRecordDto = new CreatePointRecordDto(-item.getPrice(), item.getItemName() + " 구매", childId);
        PointRecord pointRecord = new PointRecord(createPointRecordDto.getAmount(),
                createPointRecordDto.getSource(),
                child);
        em.persist(pointRecord);

        // 아이템 구매 이력 추가 및 포인트 수정
        child.addPoint(createPointRecordDto.getAmount());
        child.getPoints().add(pointRecord);

        // 소유 아이템 리스트 추가
        ChildItem childItem = new ChildItem(child, item);
        child.getChildItems().add(childItem);
        item.getChildItems().add(childItem);

        em.persist(childItem);

        return PurchaseResult.SUCCESS;
    }

    // 소유 아이템 리스트 조회
    @Override
    public List<ChildItem> haveItems(Long childId) {
        Child child = em.find(Child.class, childId);
        System.out.println(child.getId());
        System.out.println(child.toString());
        System.out.println(child.getChildItems());
        return queryFactory
                .selectFrom(childItem)
                .join(childItem.item, item).fetchJoin()
                .where(childItem.child.id.eq(childId))
                .fetch();
    }

    // 착용 아이템 리스트 조회
    @Override
    public List<ChildItem> isOnItems(Long childId) {
        return queryFactory
                .selectFrom(childItem)
                .join(childItem.item, item).fetchJoin()
                .where(childItem.child.id.eq(childId), childItem.isOn.eq(true))
                .fetch();
    }

    // 아이템 버리기
    @Override
    public Boolean throwOutItem(Long childId, Long itemId) {
        ChildItem childItemToDelete = queryFactory
                .selectFrom(childItem)
                .where(childItem.child.id.eq(childId)
                        .and(childItem.item.id.eq(itemId)))
                .fetchOne();
        if (childItemToDelete == null) {
            return null;
        }

        Child child = childItemToDelete.getChild();
        Item item = childItemToDelete.getItem();

        child.getChildItems().remove(childItemToDelete);
        item.getChildItems().remove(childItemToDelete);

        em.remove(childItemToDelete);

        return true;
    }

    // 아이템 탈착
    @Override
    public Boolean toggleItem(Long childId, Long itemId) {
        ChildItem childItemToToggle = queryFactory
                .selectFrom(childItem)
                .where(childItem.child.id.eq(childId),
                        childItem.item.id.eq(itemId))
                .fetchOne();
        ItemType itemType = childItemToToggle.getItem().getItemType();
        List<ChildItem> items = queryFactory
                .selectFrom(childItem)
                .where(childItem.child.id.eq(childId),
                        childItem.item.itemType.eq(itemType))
                .fetch();

        if (childItemToToggle == null) {
            return null;
        }

        childItemToToggle.toggle();

        if (childItemToToggle.isOn()) {
            for (ChildItem childItem : items) {
                if (childItem != childItemToToggle && childItem.isOn()) {
                    childItem.toggle();
                }
            }
        }

        return childItemToToggle.isOn();
    }
}
