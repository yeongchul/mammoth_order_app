package com.project.mammoth_order_backend.order.repository;

import com.project.mammoth_order_backend.order.entity.NewMenu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewMenuRepository extends JpaRepository<NewMenu, Long> {
}
