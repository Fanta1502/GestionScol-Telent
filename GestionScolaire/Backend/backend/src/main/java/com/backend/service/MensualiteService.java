package com.backend.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.EleveDAO;
import com.backend.persistence.dao.MensualiteDAO;
import com.backend.persistence.dao.PeriodeDAO;
import com.backend.persistence.dto.MensualiteDto;
import com.backend.persistence.entities.Mensualite;
import com.backend.persistence.mappers.EleveMapper;
import com.backend.persistence.mappers.MensualiteMapper;
import com.backend.persistence.mappers.PeriodeMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class MensualiteService {
	private final MensualiteDAO mensualiteDAO;
	private final MensualiteMapper mensualiteMapper;
	private final PeriodeDAO periodeDAO;
	private final PeriodeMapper periodeMapper;
	private final EleveDAO eleveDAO;
	private final EleveMapper eleveMapper;
	public PageResponse<MensualiteDto> findByEleve(final SearchRequest request,long id)
	{
		try {
			Page<Mensualite> mensualites = mensualiteDAO.findByIsDeletedIsFalseAndEleveId(SearchRequestUtil.toPageRequest(request),id);
			log.info("Mensualite by eleve response  successfully");
			return new PageResponse<MensualiteDto>(mensualiteMapper.fromEntitiesToDtoList(mensualites.getContent()), mensualites.getSize(),mensualites.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting mensualite", e);
			return null;
		}		 
	}
	public MensualiteDto add(MensualiteDto mensualiteDto) {
		try {
			mensualiteDto.setPeriode(periodeMapper.fromEntityToDto(periodeDAO.findById(mensualiteDto.getPeriode().getId()).get()));
			mensualiteDto.setEleve(eleveMapper.fromEntityToDto(eleveDAO.findById(mensualiteDto.getEleve().getId()).get()));
			Mensualite mensualite = mensualiteMapper.fromDtoToEntity(mensualiteDto);
			mensualite = this.mensualiteDAO.saveAndFlush(mensualite);
			log.info("Mensualite with id= {} saved successfully", mensualite.getId());
			return mensualiteMapper.fromEntityToDto(mensualite);
		} catch (Exception e) {
			log.error("Cannot add mensualite ", e);
			return null;
		}
	}
	public MensualiteDto edit(MensualiteDto mensualiteDto) {
		try {
			Optional<Mensualite> optional = mensualiteDAO.findById(mensualiteDto.getId());
			if (optional.isPresent()) {
				Mensualite mensualite = optional.get();
				mensualite.setDate_paiement(mensualiteDto.getDate_paiement());
				mensualite.setMontant_paye(mensualiteDto.getMontant_paye());
				mensualite.setMontant_restant(mensualiteDto.getMontant_restant());
				mensualite.setMode_paiement(mensualiteDto.getMode_paiement());
				mensualite.setNom_prenom_payeur(mensualiteDto.getNom_prenom_payeur());
				mensualite.setMontant(mensualiteDto.getMontant());
				mensualiteDAO.saveAndFlush(mensualite);
				log.info("Mensualite with id= {} edited successfully", mensualiteDto.getId());
				return mensualiteMapper.fromEntityToDto(mensualite);
			} else {
				log.error("Cannot get Mensualite");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit Mensualite", e);
			return null;
		}
	}
	public MensualiteDto remove(Long id) {
		Optional<Mensualite> optional = mensualiteDAO.findById(id);
		if (optional.isPresent()) {
			Mensualite mensualite = optional.get();
			mensualite.setDeleted(true);
			mensualiteDAO.saveAndFlush(mensualite);
			log.info("Mensualite with id= {} removed successfully",mensualite.getId());
			return mensualiteMapper.fromEntityToDto(mensualite);
		} else {
			log.error("Cannot get Mensualite");
			return null;
		}
	}
}
