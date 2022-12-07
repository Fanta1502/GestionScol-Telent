package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.persistence.entities.Personnel;

public interface PersonnelDAO extends JpaRepository<Personnel, Long> {
	Page<Personnel> findByIsDeletedIsFalse(Pageable pageable);
	List<Personnel> findByIsDeletedIsFalseOrderByNom();
	List<Personnel> findByIsDeletedIsFalse();
    int countByIsDeletedIsFalse();
}