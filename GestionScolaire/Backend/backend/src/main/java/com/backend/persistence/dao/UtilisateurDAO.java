package com.backend.persistence.dao;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Utilisateur;

@Repository
public interface UtilisateurDAO extends JpaRepository<Utilisateur, Long> {

    Optional<Utilisateur> findByEmail(String email);
    Optional<Utilisateur> findByUsername(String username);
    Optional<Utilisateur> findById(Long id);
    Utilisateur findOneById(Long id);
    Utilisateur findOneByEmail(String email);
	Page<Utilisateur> findByIsDeletedIsFalse(Pageable pageable);
}
