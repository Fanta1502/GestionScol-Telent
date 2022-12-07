package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Enseignant;

@Repository
public interface EnseignantDAO extends JpaRepository<Enseignant, Long>{ 
    Page<Enseignant> findByIsDeletedIsFalseOrderByNom(Pageable pageable);
    int countByIsDeletedIsFalse();
	List<Enseignant> findByIsDeletedIsFalse();
}
