package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.EnseignantDAO;
import com.backend.persistence.dto.EnseignantDto;
import com.backend.persistence.entities.Enseignant;
import com.backend.persistence.mappers.EnseingnantMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class EnseignantService {
	private final EnseignantDAO enseignantDAO;
	private final EnseingnantMapper enseingnantMapper;
	
	public PageResponse<EnseignantDto> all(final SearchRequest request)
	{
		try {
			Page<Enseignant> enseignants = enseignantDAO.findByIsDeletedIsFalseOrderByNom(SearchRequestUtil.toPageRequest(request));
			log.info("Enseignant response successfully");
			return new PageResponse<EnseignantDto>(enseingnantMapper.fromEntitiesToDtoList(enseignants.getContent()), enseignants.getSize(),enseignants.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting Enseignant", e);
			return null;
		}		
	} 
	public int count()
	{
		try {
			log.info("Count Enseignant response  successfully");
			return enseignantDAO.countByIsDeletedIsFalse();
		} catch (Exception e) {
			log.error("There was an error while getting enseignant", e);
			return 0;
		}		 
	} 
	public List<EnseignantDto> allWithoutPAgination()
	{
		try {
			List<Enseignant> enseignants = enseignantDAO.findByIsDeletedIsFalse();
			log.info("Enseignant response successfully");
			return enseingnantMapper.fromEntitiesToDtoList(enseignants);
		} catch (Exception e) {
			log.error("There was an error while getting Enseignant", e);
			return null;
		}		
	}
	public EnseignantDto add(EnseignantDto enseignantDto) {
		try {
			Enseignant enseignant = enseingnantMapper.fromDtoToEntity(enseignantDto);
			enseignant = this.enseignantDAO.saveAndFlush(enseignant);
			log.info("Enseignant with id= {} saved successfully", enseignant.getId());
			return enseingnantMapper.fromEntityToDto(enseignant);
		} catch (Exception e) {
			log.error("Cannot add Enseignant ", e);
			return null;
		}
	}
	public EnseignantDto edit(EnseignantDto enseignantDto) {
		try {
			Optional<Enseignant> optional = enseignantDAO.findById(enseignantDto.getId());
			if (optional.isPresent()) {
				Enseignant enseignant = optional.get();
				enseignant.setNom(enseignantDto.getNom());
				enseignant.setPrenom(enseignantDto.getPrenom());
				enseignant.setAdresse(enseignantDto.getAdresse());
				enseignant.setGenre(enseignantDto.getGenre());
				enseignant.setTelephone(enseignantDto.getTelephone());
				enseignant.setDate_recrutement(enseignantDto.getDate_recrutement());
				enseignant.setNationalite(enseignantDto.getNationalite());
				enseignant.setSpecialite(enseignantDto.getSpecialite());
				enseignant.setDernier_diplome(enseignantDto.getDernier_diplome());
				enseignant.setEtat_contractuel(enseignantDto.getEtat_contractuel());
				enseignantDAO.saveAndFlush(enseignant);
				log.info("Enseignant with id= {} edited successfully", enseignantDto.getId());
				return enseingnantMapper.fromEntityToDto(enseignant);
			} else {
				log.error("Cannot get Enseignant");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit Enseignant", e);
			return null;
		}
	}
	public EnseignantDto remove(Long id) {
		Optional<Enseignant> optional = enseignantDAO.findById(id);
		if (optional.isPresent()) {
			Enseignant enseignants = optional.get();
			enseignants.setDeleted(true);
			enseignantDAO.saveAndFlush(enseignants);
			log.info("Enseignant with id= {} removed successfully",enseignants.getId());
			return enseingnantMapper.fromEntityToDto(enseignants);
		} else {
			log.error("Cannot get Enseignant");
			return null;
		}
	}
}

