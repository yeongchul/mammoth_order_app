package com.project.mammoth_order_backend.store.controller;

import com.project.mammoth_order_backend.auth.security.CustomUserDetails;
import com.project.mammoth_order_backend.store.dto.MyStoreResponseDto;
import com.project.mammoth_order_backend.store.dto.MyStoreSaveRequestDto;
import com.project.mammoth_order_backend.store.entity.Store;
import com.project.mammoth_order_backend.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/store")
@RequiredArgsConstructor
public class StoreController {
    private final StoreService storeService;
    
    // 매장 전체 보기
    @GetMapping
    public ResponseEntity<List<Store>> getAllStores() {
        List<Store> storeList = storeService.getAllStores();
        return ResponseEntity.ok(storeList);
    }
    
    // my 매장 보기
    @GetMapping("/my")
    public ResponseEntity<List<MyStoreResponseDto>> getMyStore(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        List<MyStoreResponseDto> myStoreList = storeService.getMyStore(userId);
        return ResponseEntity.ok(myStoreList);
    }
    
    // my 매장 저장
    @PostMapping("/my")
    public ResponseEntity<String> saveMyStore(@AuthenticationPrincipal CustomUserDetails userDetails,
                                              @RequestBody MyStoreSaveRequestDto myStoreSaveRequestDto) {
        Long userId = userDetails.getId();
        storeService.saveMyStore(userId, myStoreSaveRequestDto);
        return ResponseEntity.ok("MY 매장에 추가되었습니다.");
    }
    
    // my 매장 삭제
    @DeleteMapping("/my/{id}")
    public ResponseEntity<String> deleteMyStore(@PathVariable("id") Long myStoreId) {
        storeService.deleteMyStore(myStoreId);
        return ResponseEntity.ok("MY 매장에서 삭제되었습니다.");
    }
}
