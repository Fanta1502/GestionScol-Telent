package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.persistence.entities.Classe;

public interface ClasseDAO extends JpaRepository<Classe, Long> {
	Page<Classe> findByIsDeletedIsFalse(Pageable pageable);
	List<Classe> findByIsDeletedIsFalse();
}