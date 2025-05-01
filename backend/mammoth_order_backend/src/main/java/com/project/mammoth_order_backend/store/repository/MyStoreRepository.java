package com.project.mammoth_order_backend.store.repository;

import com.project.mammoth_order_backend.store.dto.MyStoreResponseDto;
import com.project.mammoth_order_backend.store.entity.MyStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MyStoreRepository extends JpaRepository<MyStore, Long> {
    List<MyStore> findAllByUserId(Long userId);

    @Query("SELECT new com.project.mammoth_order_backend.store.dto.MyStoreResponseDto(" +
            "m.id," +
            "m.userId, " +
            "m.storeId, " +
            "s.name, " +
            "s.address) " +
            "FROM MyStore m " +
            "JOIN Store s ON m.storeId = s.id " +
            "WHERE m.userId = :userId")
    List<MyStoreResponseDto> findMyStoreResponseDto(@Param("userId") Long userId);
}
