package com.backend.persistence.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.payload.request.PageRequest;
import com.backend.persistence.entities.Etablissement;

@Repository
public interface EtablissementDAO  extends JpaRepository<Etablissement, Long> {

	Page<Etablissement> findByIsDeletedIsFalseOrderByNom(PageRequest pageRequest);

}
