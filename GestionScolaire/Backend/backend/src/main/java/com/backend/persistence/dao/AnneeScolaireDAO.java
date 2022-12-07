package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.AnneeScolaire;

@Repository
public interface AnneeScolaireDAO extends JpaRepository<AnneeScolaire, Long> {
	Page<AnneeScolaire> findByIsDeletedIsFalse(Pageable pageable);
	List<AnneeScolaire> findByIsDeletedIsFalse();
}