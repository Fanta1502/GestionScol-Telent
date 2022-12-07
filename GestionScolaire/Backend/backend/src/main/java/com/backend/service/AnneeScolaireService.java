package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.AnneeScolaireDAO;
import com.backend.persistence.dto.AnneeScolaireDto;
import com.backend.persistence.entities.AnneeScolaire;
import com.backend.persistence.mappers.AnneeScolaireMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class AnneeScolaireService {
	private final AnneeScolaireDAO anneeScolaireDAO;
	private final AnneeScolaireMapper anneeScolaireMapper;
	public PageResponse<AnneeScolaireDto> all(final SearchRequest request)
	{
		try {
			Page<AnneeScolaire> anneeScolaires = anneeScolaireDAO.findByIsDeletedIsFalse(SearchRequestUtil.toPageRequest(request));
			log.info("Annee scolaire response successfully");
			return new PageResponse<AnneeScolaireDto>(anneeScolaireMapper.fromEntitiesToDtoList(anneeScolaires.getContent()), anneeScolaires.getSize(),anneeScolaires.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting annee scolaire", e);
			return null;
		}		
	}
	public List<AnneeScolaireDto> allWhithoutPagination()
	{
		try {
			List<AnneeScolaire> anneeScolaires = anneeScolaireDAO.findByIsDeletedIsFalse();
			log.info("Annee scolaire response successfully");
			return anneeScolaireMapper.fromEntitiesToDtoList(anneeScolaires);
		} catch (Exception e) {
			log.error("There was an error while getting annee scolaire", e);
			return null;
		}		
	}
	public AnneeScolaireDto add(AnneeScolaireDto anneeScolaireDto) {
		try {
			AnneeScolaire anneeScolaire = anneeScolaireMapper.fromDtoToEntity(anneeScolaireDto);
			anneeScolaire = this.anneeScolaireDAO.saveAndFlush(anneeScolaire);
			log.info("Annee scolaire with id= {} saved successfully", anneeScolaire.getId());
			return anneeScolaireMapper.fromEntityToDto(anneeScolaire);
		} catch (Exception e) {
			log.error("Cannot add annee scolaire ", e);
			return null;
		}
	}
	public AnneeScolaireDto edit(AnneeScolaireDto anneeScolaireDto) {
		try {
			Optional<AnneeScolaire> optional = anneeScolaireDAO.findById(anneeScolaireDto.getId());
			if (optional.isPresent()) {
				AnneeScolaire anneeScolaire = optional.get();
				anneeScolaire.setLibele_annee_scolaire(anneeScolaireDto.getLibele_annee_scolaire());
				anneeScolaire.setDate_debut_annee_scolaire(anneeScolaireDto.getDate_debut_annee_scolaire());
				anneeScolaire.setDate_fin_annee_scolaire(anneeScolaireDto.getDate_fin_annee_scolaire());
				anneeScolaireDAO.saveAndFlush(anneeScolaire);
				log.info("Annee scolaire with id= {} edited successfully", anneeScolaireDto.getId());
				return anneeScolaireMapper.fromEntityToDto(anneeScolaire);
			} else {
				log.error("Cannot get annee scolaire");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit annee scolaire", e);
			return null;
		}
	}
	public AnneeScolaireDto remove(Long id) {
		Optional<AnneeScolaire> optional = anneeScolaireDAO.findById(id);
		if (optional.isPresent()) {
			AnneeScolaire anneeScolaire = optional.get();
			anneeScolaire.setDeleted(true);
			anneeScolaireDAO.saveAndFlush(anneeScolaire);
			log.info("annee scolaire with id= {} removed successfully",anneeScolaire.getId());
			return anneeScolaireMapper.fromEntityToDto(anneeScolaire);
		} else {
			log.error("Cannot get annee scolaire");
			return null;
		}
	}
}
