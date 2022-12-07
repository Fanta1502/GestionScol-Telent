package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.PersonnelDAO;
import com.backend.persistence.dto.PersonnelDto;
import com.backend.persistence.entities.Personnel;
import com.backend.persistence.mappers.PersonnelMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class PersonnelService {
	private final PersonnelDAO personnelDAO;
	private final PersonnelMapper PersonnelMapper;
	public PageResponse<PersonnelDto> all(final SearchRequest request)
	{
		try {
			Page<Personnel> personnels = personnelDAO.findByIsDeletedIsFalse(SearchRequestUtil.toPageRequest(request));
			log.info("Personnel response successfully");
			return new PageResponse<PersonnelDto>(PersonnelMapper.fromEntitiesToDtoList(personnels.getContent()), personnels.getSize(),personnels.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting Personnel", e);
			return null;
		}		
	} 
	public int count()
	{
		try {
			log.info("Count personnel response  successfully");
			return personnelDAO.countByIsDeletedIsFalse();
		} catch (Exception e) {
			log.error("There was an error while getting personnel", e);
			return 0;
		}		 
	} 
	public PersonnelDto add(PersonnelDto PersonnelDto) {
		try {
			Personnel personnel = PersonnelMapper.fromDtoToEntity(PersonnelDto);
			personnel = this.personnelDAO.saveAndFlush(personnel);
			log.info("Personnel with id= {} saved successfully", personnel.getId());
			return PersonnelMapper.fromEntityToDto(personnel);
		} catch (Exception e) {
			log.error("Cannot add Personnel ", e);
			return null;
		}
	}
	public PersonnelDto edit(PersonnelDto personnelDto) {
		try {
			Optional<Personnel> optional = personnelDAO.findById(personnelDto.getId());
			if (optional.isPresent()) {
				Personnel personnel = optional.get();
				personnel.setNom(personnelDto.getNom());
				personnel.setPrenom(personnelDto.getPrenom());
				personnel.setAdresse(personnelDto.getAdresse());
				personnel.setTelephone(personnelDto.getTelephone());
				personnel.setNationalite(personnelDto.getNationalite());
				personnel.setFonction(personnelDto.getFonction());
				personnel.setRole(personnelDto.getRole());
				personnel.setType_contrat(personnelDto.getType_contrat());
				personnel.setDuree_contrat(personnelDto.getDuree_contrat());
				personnelDAO.saveAndFlush(personnel);
				log.info("Personnel with id= {} edited successfully", personnelDto.getId());
				return PersonnelMapper.fromEntityToDto(personnel);
			} else {
				log.error("Cannot get Personnel");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit Personnel", e);
			return null;
		}
	}
	public PersonnelDto remove(Long id) {
		Optional<Personnel> optional = personnelDAO.findById(id);
		if (optional.isPresent()) {
			Personnel Personnel = optional.get();
			Personnel.setDeleted(true);
			personnelDAO.saveAndFlush(Personnel);
			log.info("Personnel with id= {} removed successfully",Personnel.getId());
			return PersonnelMapper.fromEntityToDto(Personnel);
		} else {
			log.error("Cannot get Personnel");
			return null;
		}
	}
	public List<PersonnelDto> allWhithoutPagination()
	{
		try {
			List<Personnel> personnels = personnelDAO.findByIsDeletedIsFalseOrderByNom();
			log.info("Personnel response successfully");
			return PersonnelMapper.fromEntitiesToDtoList(personnels);
		} catch (Exception e) {
			log.error("There was an error while getting personnels", e);
			return null;
		}		
	}
}
