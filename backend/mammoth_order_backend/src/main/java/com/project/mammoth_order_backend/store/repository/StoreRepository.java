package com.project.mammoth_order_backend.store.repository;

import com.project.mammoth_order_backend.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
}
