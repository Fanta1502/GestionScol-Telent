package com.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.persistence.dao.EncaissementDAO;
import com.backend.persistence.dto.DepenseDto;
import com.backend.persistence.dto.EncaissementDto;
import com.backend.persistence.entities.Depense;
import com.backend.persistence.entities.Encaissement;
import com.backend.persistence.mappers.EncaissementMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class EncaissementService {
	private final EncaissementDAO encaissementDAO;
	private final EncaissementMapper encaissementMapper;
	
	public List<Object> all()
	{
		try {
			List<Object> encaissements = encaissementDAO.findByIsDeletedIsFalseOrderByDateAsc(LocalDate.now().getYear());
			log.info("encaissement response successfully");
			return encaissements;
		} catch (Exception e) {
			log.error("There was an error while getting encaissement", e);
			return null;
		}		
	}

	public EncaissementDto find(String libelle, LocalDate date) {
		try {
			Encaissement d = encaissementDAO.findByLibelleAndDateAndIsDeletedIsFalse(libelle, date);
			log.info("Encaissement response successfully");
			return encaissementMapper.fromEntityToDto(d);
		} catch (Exception e) {
			log.error("There was an error while getting depense", e);
			return null;
		}
	}
	public EncaissementDto add(EncaissementDto encaissementDto) {
		try {
			Encaissement encaissement = encaissementMapper.fromDtoToEntity(encaissementDto);
			encaissement = this.encaissementDAO.saveAndFlush(encaissement);
			log.info("encaissement with id= {} saved successfully", encaissement.getId());
			return encaissementMapper.fromEntityToDto(encaissement);
		} catch (Exception e) {
			log.error("Cannot add encaissement ", e);
			return null;
		}
	}
	public EncaissementDto edit(EncaissementDto encaissementDto) {
		try {
			Optional<Encaissement> optional = encaissementDAO.findById(encaissementDto.getId());
			if (optional.isPresent()) {
				Encaissement encaissement = optional.get();
				encaissement.setLibelle(encaissementDto.getLibelle());
				encaissement.setMontant(encaissementDto.getMontant());
				encaissement.setMode_paiement(encaissementDto.getMode_paiement());
				encaissement.setDate(encaissementDto.getDate());
				encaissementDAO.saveAndFlush(encaissement);
				log.info("encaissement with id= {} edited successfully", encaissementDto.getId());
				return encaissementMapper.fromEntityToDto(encaissement);
			} else {
				log.error("Cannot get encaissement");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit encaissement", e);
			return null;
		}
	}
	public EncaissementDto remove(Long id) {
		Optional<Encaissement> optional = encaissementDAO.findById(id);
		if (optional.isPresent()) {
			Encaissement encaissement = optional.get();
			encaissement.setDeleted(true);
			encaissementDAO.saveAndFlush(encaissement);
			log.info("encaissement with id= {} removed successfully",encaissement.getId());
			return encaissementMapper.fromEntityToDto(encaissement);
		} else {
			log.error("Cannot get encaissement");
			return null;
		}
	}
}
