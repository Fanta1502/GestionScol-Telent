package com.backend.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.EtablissementDAO;
import com.backend.persistence.dto.EtablissementDto;
import com.backend.persistence.entities.Etablissement;
import com.backend.persistence.mappers.EtablissementMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class EtablissementService {
	private final EtablissementDAO etablissementDAO;
	private final EtablissementMapper etablissementMapper;
	public PageResponse<EtablissementDto> all(final SearchRequest request)
	{
		try {
			Page<Etablissement> etablissements = etablissementDAO.findByIsDeletedIsFalseOrderByNom(SearchRequestUtil.toPageRequest(request));
			log.info("Etablissement response successfully");
			return new PageResponse<EtablissementDto>(etablissementMapper.fromEntitiesToDtoList(etablissements.getContent()), etablissements.getSize(),etablissements.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting etablissemnt", e);
			return null;
		}		
	} 
	public EtablissementDto add(EtablissementDto etablissementDto) {
		try {
			Etablissement etablissement = etablissementMapper.fromDtoToEntity(etablissementDto);
			etablissement = this.etablissementDAO.saveAndFlush(etablissement);
			log.info("Etablissement with id= {} saved successfully", etablissement.getId());
			return etablissementMapper.fromEntityToDto(etablissement);
		} catch (Exception e) {
			log.error("Cannot add etablissement ", e);
			return null;
		}
	}
	public EtablissementDto edit(EtablissementDto etablissementDto) {
		try {
			Optional<Etablissement> optional = etablissementDAO.findById(etablissementDto.getId());
			if (optional.isPresent()) {
				Etablissement etablissement = optional.get();
				etablissement.setNom(etablissementDto.getNom());
				etablissement.setSigle(etablissementDto.getSigle());
				etablissement.setSuperficie(etablissementDto.getSuperficie());
				etablissement.setAdresse(etablissementDto.getAdresse());
				etablissement.setTelephone(etablissementDto.getTelephone());
				etablissement.setEmail(etablissementDto.getEmail());
				etablissement.setNom_prenom_promoteur(etablissementDto.getNom_prenom_promoteur());
				etablissement.setNom_prenom_proviseur(etablissementDto.getNom_prenom_proviseur());
				etablissement.setCapacite_accueil(etablissementDto.getCapacite_accueil());
				etablissement.setLogo(etablissementDto.getLogo());
				etablissement.setDescription(etablissementDto.getDescription());
				etablissementDAO.saveAndFlush(etablissement);
				log.info("Etablissement with id= {} edited successfully", etablissementDto.getId());
				return etablissementMapper.fromEntityToDto(etablissement);
			} else {
				log.error("Cannot get etablissement");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit etablissement", e);
			return null;
		}
	}
	public EtablissementDto remove(Long id) {
		Optional<Etablissement> optional = etablissementDAO.findById(id);
		if (optional.isPresent()) {
			Etablissement etablissement = optional.get();
			etablissement.setDeleted(true);
			etablissementDAO.saveAndFlush(etablissement);
			log.info("Etablissement with id= {} removed successfully",etablissement.getId());
			return etablissementMapper.fromEntityToDto(etablissement);
		} else {
			log.error("Cannot get etablissement");
			return null;
		}
	}
}
