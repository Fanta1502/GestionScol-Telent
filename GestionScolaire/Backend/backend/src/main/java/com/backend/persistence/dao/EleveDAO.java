package com.backend.persistence.dao;


import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Eleve;

@Repository
public interface EleveDAO extends JpaRepository<Eleve, Long>{ 
    Page<Eleve> findByIsDeletedIsFalseOrderByNom(Pageable pageable);
	List<Eleve> findByIsDeletedIsFalseOrderByNom();
	Eleve findByMatriculeAndIsDeletedIsFalse(String matricule);
    Page<Eleve> findByInscriptionClasseIdAndIsDeletedIsFalseOrderByNom(long id,Pageable pageable);
    int countByIsDeletedIsFalse();
	List<Eleve> findByInscriptionClasseIdAndIsDeletedIsFalseOrderByNom(long classeId);
}
