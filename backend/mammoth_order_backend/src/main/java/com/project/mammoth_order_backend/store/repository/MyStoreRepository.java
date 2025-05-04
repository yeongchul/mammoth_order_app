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
            "m.user.id, " +
            "m.store.id, " +
            "m.store.name, " +
            "m.store.address) " +
            "FROM MyStore m " +
            "WHERE m.user.id = :userId")
    List<MyStoreResponseDto> findMyStoreResponseDto(@Param("userId") Long userId);
}
