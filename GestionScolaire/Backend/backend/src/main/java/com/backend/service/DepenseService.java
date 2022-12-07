package com.backend.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.DepenseDAO;
import com.backend.persistence.dto.DepenseDto;
import com.backend.persistence.entities.Depense;
import com.backend.persistence.mappers.DepenseMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class DepenseService {
	private final DepenseDAO depenseDAO;
	private final DepenseMapper depenseMapper;
	
	public PageResponse<DepenseDto> all(final SearchRequest request)
	{
		try {
			Page<Depense> depenses = depenseDAO.findByIsDeletedIsFalse(SearchRequestUtil.toPageRequest(request));
			log.info("Depense response successfully");
			return new PageResponse<DepenseDto>(depenseMapper.fromEntitiesToDtoList(depenses.getContent()), depenses.getSize(),depenses.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting depense", e);
			return null;
		}		
	}
	public List<DepenseDto> allWithoutPagination()
	{
		try {
			List<Depense> depenses = depenseDAO.findByIsDeletedIsFalse();
			log.info("Depense response successfully");
			return depenseMapper.fromEntitiesToDtoList(depenses);
		} catch (Exception e) {
			log.error("There was an error while getting depense", e);
			return null;
		}		
	}
	public List<Object> all()
	{
		try {
			List<Object> depenses = depenseDAO.findByIsDeletedIsFalseOrderByDateAsc(LocalDate.now().getYear());
			log.info("Depense response successfully");
			return depenses;
		} catch (Exception e) {
			log.error("There was an error while getting depense", e);
			return null;
		}		
	}
	public DepenseDto add(DepenseDto depenseDto) {
		try {
			Depense depense = depenseMapper.fromDtoToEntity(depenseDto);
			depense = this.depenseDAO.saveAndFlush(depense);
			log.info("Depense with id= {} saved successfully", depense.getId());
			return depenseMapper.fromEntityToDto(depense);
		} catch (Exception e) {
			log.error("Cannot add depense ", e);
			return null;
		}
	}
	public DepenseDto edit(DepenseDto depenseDto) {
		try {
			Optional<Depense> optional = depenseDAO.findById(depenseDto.getId());
			if (optional.isPresent()) {
				Depense depense = optional.get();
				depense.setLibelle(depenseDto.getLibelle());
				depense.setMontant(depenseDto.getMontant());
				depense.setMode_paiement(depenseDto.getMode_paiement());
				depense.setFournisseur(depenseDto.getFournisseur());
				depense.setResponsable(depenseDto.getResponsable());
				depense.setMotif(depenseDto.getMotif());
				depense.setDate(depenseDto.getDate());
				depense.setType(depenseDto.getType());
				depenseDAO.saveAndFlush(depense);
				log.info("Depense with id= {} edited successfully", depenseDto.getId());
				return depenseMapper.fromEntityToDto(depense);
			} else {
				log.error("Cannot get depense");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit depense", e);
			return null;
		}
	}
	public DepenseDto find(String libelle, LocalDate date) {
		try {
			Depense d = depenseDAO.findByLibelleAndDateAndIsDeletedIsFalse(libelle, date);
			log.info("Depense response successfully");
			return depenseMapper.fromEntityToDto(d);
		} catch (Exception e) {
			log.error("There was an error while getting depense", e);
			return null;
		}
	}
	public DepenseDto remove(Long id) {
		Optional<Depense> optional = depenseDAO.findById(id);
		if (optional.isPresent()) {
			Depense depense = optional.get();
			depense.setDeleted(true);
			depenseDAO.saveAndFlush(depense);
			log.info("Depense with id= {} removed successfully",depense.getId());
			return depenseMapper.fromEntityToDto(depense);
		} else {
			log.error("Cannot get depense");
			return null;
		}
	}
}