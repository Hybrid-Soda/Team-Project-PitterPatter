package com.pitpat.pitterpatter.domain.child.service;

import com.pitpat.pitterpatter.domain.assets.service.childitem.ChildItemService;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildRequestDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildResponseDTO;
import com.pitpat.pitterpatter.domain.child.model.dto.ChildUpdateDTO;
import com.pitpat.pitterpatter.domain.child.repository.ChildRepository;
import com.pitpat.pitterpatter.domain.user.jwt.JwtTokenProvider;
import com.pitpat.pitterpatter.domain.user.model.dto.UserDto;
import com.pitpat.pitterpatter.domain.user.service.UserService;
import com.pitpat.pitterpatter.entity.Child;
import com.pitpat.pitterpatter.entity.UserEntity;
import com.pitpat.pitterpatter.global.exception.exceptions.DataNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChildServiceImpl implements ChildService {

    private final ChildRepository childRepository;
    private final ChildItemService childItemService;
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public List<ChildResponseDTO> getChildrenByUserId(int userId) {
        List<ChildResponseDTO> childrenByUserId = childRepository.findByUserUserId(userId);
        childExceptionHandling(childrenByUserId);
        return childrenByUserId;
    }

    @Override
    public Long addChild(int userId, ChildRequestDTO childRequestDTO) {
        UserDto userDto = userService.getUserById(userId);
        UserEntity userEntity = userDto.toEntity();
        Child child = childRequestDTO.toAddEntity(userEntity, childRequestDTO);
        childRepository.save(child);
        childItemService.buyItem(child.getId(), 1L);
        childItemService.buyItem(child.getId(), 2L);
        childItemService.toggleItem(child.getId(), 1L);
        childItemService.toggleItem(child.getId(), 2L);
        return child.getId();
    }

    @Override
    public ChildResponseDTO getChildById(Long childId) {
        return childRepository.findById(childId)
                .map(child -> new ChildResponseDTO(
                        child.getId(),
                        child.getProfileImage(),
                        child.getNickname(),
                        child.getGender(),
                        child.getBirth(),
                        child.getPersonalRecord(),
                        child.getPoint(),
                        child.getCreatedAt(),
                        child.getUpdatedAt()))
                .orElseThrow(() -> new DataNotFoundException("해당 데이터가 존재하지 않습니다."));
    }

    @Override
    public Long updateChild(Long childId, ChildUpdateDTO childUpdateDTO) {
        // 자녀 존재여부 검증 후 존재한다면 Child 할당
        Child child = validateChildExists(childId);
        Child updatedChild = childUpdateDTO.toUpdateEntity(child, childUpdateDTO);
        childRepository.save(updatedChild);
        return updatedChild.getId();
    }

    @Override
    public void deleteChild(Long childId) {
        // 자녀 존재여부 검증 후 존재한다면 Child 할당
        Child child = validateChildExists(childId);

        childRepository.delete(child);
    }

    /**
     *
     * Exception 검증 메소드
     */
    public void childExceptionHandling(List<ChildResponseDTO> children) {
        if (children.isEmpty()) {
            throw new DataNotFoundException("해당 데이터가 존재하지 않습니다.");
        }
    }

    // 해당 ID의 자녀가 존재하는지 검증
    private Child validateChildExists(Long childId) {
        return childRepository.findById(childId)
                .orElseThrow(() -> new DataNotFoundException("해당 자녀가 존재하지 않습니다."));
    }
}