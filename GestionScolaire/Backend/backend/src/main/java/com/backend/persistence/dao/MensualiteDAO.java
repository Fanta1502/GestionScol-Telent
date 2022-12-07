package com.backend.persistence.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Mensualite;

@Repository
public interface MensualiteDAO extends JpaRepository<Mensualite, Long>{ 
    Page<Mensualite> findByIsDeletedIsFalseAndEleveId(Pageable pageable,long id);
	List<Mensualite> findByIsDeletedIsFalse();
}

