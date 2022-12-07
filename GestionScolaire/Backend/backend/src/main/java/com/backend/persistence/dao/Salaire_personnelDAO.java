package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.persistence.entities.Salaire_personnel;

public interface Salaire_personnelDAO  extends JpaRepository<Salaire_personnel, Long> {
	Page<Salaire_personnel> findByIsDeletedIsFalseAndPersonnelId(Pageable pageable,long id);
	List<Salaire_personnel> findByIsDeletedIsFalse();
	List<Salaire_personnel> findByIsDeletedIsFalseOrderByDateAsc();
}
