package com.backend.persistence.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.backend.persistence.entities.Eleve;
import com.backend.persistence.entities.Encaissement;
	@Repository
	public interface EncaissementDAO extends JpaRepository<Encaissement, Long>{ 
		List<Eleve> findByIsDeletedIsFalseOrderByDate();
		@Query(value = "SELECT d.id,d.creation_date,d.update_date,d.libelle,d.montant,d.mode_paiement,d.is_deleted,d.date, SUM(d.montant) FROM t_encaissement AS d WHERE year(d.date) =:year AND d.is_deleted = false GROUP BY month(d.date) ORDER BY d.date ASC",nativeQuery = true)
		List<Object> findByIsDeletedIsFalseOrderByDateAsc(@Param("year") int year);
		Encaissement findByLibelleAndDateAndIsDeletedIsFalse(String libelle, LocalDate date);
	}
