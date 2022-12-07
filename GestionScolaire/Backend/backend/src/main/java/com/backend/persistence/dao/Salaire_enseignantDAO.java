package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.backend.persistence.entities.Salaire_enseignant;
import com.backend.persistence.entities.Salaire_personnel;

public interface Salaire_enseignantDAO  extends JpaRepository<Salaire_enseignant, Long> {
	Page<Salaire_enseignant> findByIsDeletedIsFalseAndEnseignantId(Pageable pageable,long id);
	List<Salaire_enseignant> findByIsDeletedIsFalse();
	List<Salaire_enseignant> findByIsDeletedIsFalseOrderByDateAsc();
}