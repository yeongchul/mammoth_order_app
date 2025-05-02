package com.project.mammoth_order_backend.store.service;

import com.project.mammoth_order_backend.store.dto.MyStoreResponseDto;
import com.project.mammoth_order_backend.store.dto.MyStoreSaveRequestDto;
import com.project.mammoth_order_backend.store.entity.MyStore;
import com.project.mammoth_order_backend.store.entity.Store;
import com.project.mammoth_order_backend.store.repository.MyStoreRepository;
import com.project.mammoth_order_backend.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoreService {
    private final MyStoreRepository myStoreRepository;
    private final StoreRepository storeRepository;

    // 매장 전체 보기
    @Transactional(readOnly = true)
    public List<Store> getAllStores() {
        List<Store> storeList = storeRepository.findAll();
        return storeList;
    }

    // my 매장 보기
    @Transactional(readOnly = true)
    public List<MyStoreResponseDto> getAllMyStores(Long userId) {
        List<MyStoreResponseDto> myStoreList = myStoreRepository.findMyStoreResponseDto(userId);
        return myStoreList;
    }

    // my 매장 저장
    @Transactional
    public void saveMyStore(Long userId, MyStoreSaveRequestDto requestDto) {
        MyStore myStore = MyStore.builder()
                .userId(userId)
                .storeId(requestDto.getStoreId())
                .build();

        myStoreRepository.save(myStore);
    }

    // my 매장 삭제
    @Transactional
    public void deleteMyStore(Long myStoreId, Long userId) {
        MyStore myStore = myStoreRepository.findById(myStoreId)
                        .orElseThrow(() -> new IllegalArgumentException("MY 매장을 찾을 수 없습니다."));

        if(!myStore.getUserId().equals(userId)) {
            throw new IllegalArgumentException("이 매장을 삭제할 수 있는 권한이 없습니다.");
        }

        myStoreRepository.deleteById(myStoreId);
    }
}
