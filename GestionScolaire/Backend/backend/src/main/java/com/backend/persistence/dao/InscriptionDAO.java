package com.backend.persistence.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Enseignant;
import com.backend.persistence.entities.Inscription;

@Repository
public interface InscriptionDAO extends JpaRepository<Inscription, Long>{ 
    Page<Enseignant> findByIsDeletedIsFalse(Pageable pageable);
}
