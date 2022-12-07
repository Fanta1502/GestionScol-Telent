package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Periode;

@Repository
public interface PeriodeDAO extends JpaRepository<Periode, Long> {
	Page<Periode> findByIsDeletedIsFalse(Pageable pageable);
	List<Periode> findByIsDeletedIsFalse();
	Page<Periode> findByIsDeletedIsFalseAndAnneeScolaireId(Pageable pageable,long id);
}