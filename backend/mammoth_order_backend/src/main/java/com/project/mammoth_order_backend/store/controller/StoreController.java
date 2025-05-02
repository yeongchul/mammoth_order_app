package com.project.mammoth_order_backend.store.controller;

import com.project.mammoth_order_backend.auth.security.CustomUserDetails;
import com.project.mammoth_order_backend.store.dto.MyStoreResponseDto;
import com.project.mammoth_order_backend.store.dto.MyStoreSaveRequestDto;
import com.project.mammoth_order_backend.store.entity.Store;
import com.project.mammoth_order_backend.store.service.StoreService;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "전체 매장 조회", description = "등록된 모든 매장의 정보를 조회합니다.")
    @GetMapping
    public ResponseEntity<List<Store>> getAllStores() {
        List<Store> storeList = storeService.getAllStores();
        return ResponseEntity.ok(storeList);
    }
    
    // my 매장 보기
    @Operation(summary = "MY 매장 조회", description = "사용자가 등록한 MY 매장 리스트를 조회합니다.\nJWT 토큰을 헤더에 포함해야 합니다.")
    @GetMapping("/my")
    public ResponseEntity<List<MyStoreResponseDto>> getAllMyStores(@AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        List<MyStoreResponseDto> myStoreList = storeService.getAllMyStores(userId);
        return ResponseEntity.ok(myStoreList);
    }
    
    // my 매장 저장
    @Operation(summary = "MY 매장 추가", description = "사용자의 MY 매장 목록에 새로운 매장을 추가합니다.\nJWT 토큰을 헤더에 포함해야 합니다.")
    @PostMapping("/my")
    public ResponseEntity<String> addMyStore(@AuthenticationPrincipal CustomUserDetails userDetails,
                                              @RequestBody MyStoreSaveRequestDto myStoreSaveRequestDto) {
        Long userId = userDetails.getId();
        storeService.saveMyStore(userId, myStoreSaveRequestDto);
        return ResponseEntity.ok("MY 매장에 추가되었습니다.");
    }
    
    // my 매장 삭제
    @Operation(summary = "MY 매장 삭제", description = "사용자의 MY 매장 목록에서 매장을 삭제합니다.\nJWT 토큰을 헤더에 포함해야 합니다.")
    @DeleteMapping("/my/{id}")
    public ResponseEntity<String> deleteMyStore(@PathVariable("id") Long myStoreId,
                                                @AuthenticationPrincipal CustomUserDetails userDetails) {
        Long userId = userDetails.getId();
        storeService.deleteMyStore(myStoreId, userId);
        return ResponseEntity.ok("MY 매장에서 삭제되었습니다.");
    }
}
