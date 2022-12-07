package com.backend.persistence.dao;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.persistence.entities.Depense;

public interface DepenseDAO extends JpaRepository<Depense, Long> {
	Page<Depense> findByIsDeletedIsFalse(Pageable pageable);
	List<Depense> findByIsDeletedIsFalse();
	@Query(value = "SELECT d.id,d.creation_date,d.update_date,d.libelle,d.montant,d.mode_paiement,d.fournisseur,d.responsable,d.motif,d.type,d.is_deleted,d.date, SUM(d.montant) FROM t_depense AS d WHERE year(d.date) =:year AND d.is_deleted = false GROUP BY month(d.date) ORDER BY d.date ASC",nativeQuery = true)
	List<Object> findByIsDeletedIsFalseOrderByDateAsc(@Param("year") int year);
	Depense findByLibelleAndDateAndIsDeletedIsFalse(String libelle, LocalDate date);
}
