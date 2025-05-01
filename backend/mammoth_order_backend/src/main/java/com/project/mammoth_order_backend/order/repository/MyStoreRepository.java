package com.project.mammoth_order_backend.order.repository;

import com.project.mammoth_order_backend.order.entity.MyStore;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyStoreRepository extends JpaRepository<MyStore, Long> {
}
