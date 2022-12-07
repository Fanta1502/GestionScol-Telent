package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.EleveDAO;
import com.backend.persistence.dto.EleveDto;
import com.backend.persistence.entities.Eleve;
import com.backend.persistence.mappers.EleveMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class EleveService {
	private final EleveDAO eleveDAO;
	private final EleveMapper eleveMapper;

	public PageResponse<EleveDto> findByClasse(final SearchRequest request,long classeId)
	{
		try {
			Page<Eleve> eleves = eleveDAO.findByInscriptionClasseIdAndIsDeletedIsFalseOrderByNom(classeId,SearchRequestUtil.toPageRequest(request));
			log.info("ELeve by classe response  successfully");
			return new PageResponse<EleveDto>(eleveMapper.fromEntitiesToDtoList(eleves.getContent()), eleves.getSize(),eleves.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting eleve", e);
			return null;
		}		 
	} 
	public List<EleveDto> findByClasse(long classeId)
	{
		try {
			List<Eleve> eleves = eleveDAO.findByInscriptionClasseIdAndIsDeletedIsFalseOrderByNom(classeId);
			log.info("ELeve by classe response  successfully");
			return eleveMapper.fromEntitiesToDtoList(eleves);
		} catch (Exception e) {
			log.error("There was an error while getting eleve", e);
			return null;
		}		 
	} 
	public int count()
	{
		try {
			log.info("Count ELeve response  successfully");
			return eleveDAO.countByIsDeletedIsFalse();
		} catch (Exception e) {
			log.error("There was an error while getting eleve", e);
			return 0;
		}		 
	} 
	public PageResponse<EleveDto> all(final SearchRequest request)
	{
		try {
			Page<Eleve> eleves = eleveDAO.findByIsDeletedIsFalseOrderByNom(SearchRequestUtil.toPageRequest(request));
			log.info("ELeve response successfully");
			return new PageResponse<EleveDto>(eleveMapper.fromEntitiesToDtoList(eleves.getContent()), eleves.getSize(),eleves.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting eleve", e);
			return null;
		}		
	}
	public List<EleveDto> allWhithoutPagination()
	{
		try {
			List<Eleve> eleves = eleveDAO.findByIsDeletedIsFalseOrderByNom();
			log.info("ELeve response successfully");
			return eleveMapper.fromEntitiesToDtoList(eleves);
		} catch (Exception e) {
			log.error("There was an error while getting eleve", e);
			return null;
		}		
	}
	public EleveDto add(EleveDto eleveDto) {
		try {
			
			Eleve eleve = eleveMapper.fromDtoToEntity(eleveDto);
			eleve = this.eleveDAO.saveAndFlush(eleve);
			log.info("Eleve with id= {} saved successfully", eleve.getId());
			return eleveMapper.fromEntityToDto(eleve);
		} catch (Exception e) {
			log.error("Cannot add eleve ", e);
			return null;
		}
	}
	public EleveDto edit(EleveDto EleveDto) {
		try {
			Optional<Eleve> optional = eleveDAO.findById(EleveDto.getId());
			if (optional.isPresent()) {
				Eleve Eleve = optional.get();
				Eleve.setNom(EleveDto.getNom());
				Eleve.setPrenom(EleveDto.getPrenom());
				Eleve.setAdresse(EleveDto.getAdresse());
				Eleve.setTelephone(EleveDto.getTelephone());
				Eleve.setProfession_mere(EleveDto.getProfession_mere());
				Eleve.setProfession_pere(EleveDto.getProfession_pere());
				Eleve.setHandicap_particuliers(EleveDto.getHandicap_particuliers());
				Eleve.setMaladies_particulieres(EleveDto.getMaladies_particulieres());
				eleveDAO.saveAndFlush(Eleve);
				log.info("Eleve with id= {} edited successfully", EleveDto.getId());
				return eleveMapper.fromEntityToDto(Eleve);
			} else {
				log.error("Cannot get Eleve");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit Eleve", e);
			return null;
		}
	}
	public EleveDto remove(Long id) {
		Optional<Eleve> optional = eleveDAO.findById(id);
		if (optional.isPresent()) {
			Eleve Eleve = optional.get();
			Eleve.setDeleted(true);
			eleveDAO.saveAndFlush(Eleve);
			log.info("Eleve with id= {} removed successfully",Eleve.getId());
			return eleveMapper.fromEntityToDto(Eleve);
		} else {
			log.error("Cannot get Eleve");
			return null;
		}
	}
}
