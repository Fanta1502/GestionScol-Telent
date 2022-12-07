package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.EnseignantDAO;
import com.backend.persistence.dao.PeriodeDAO;
import com.backend.persistence.dao.PersonnelDAO;
import com.backend.persistence.dao.Salaire_enseignantDAO;
import com.backend.persistence.dao.Salaire_personnelDAO;
import com.backend.persistence.dto.Salaire_enseignantDto;
import com.backend.persistence.dto.Salaire_personnelDto;
import com.backend.persistence.entities.Salaire_enseignant;
import com.backend.persistence.entities.Salaire_personnel;
import com.backend.persistence.mappers.EnseingnantMapper;
import com.backend.persistence.mappers.PeriodeMapper;
import com.backend.persistence.mappers.PersonnelMapper;
import com.backend.persistence.mappers.Salaire_enseignantMapper;
import com.backend.persistence.mappers.Salaire_personnelMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class SalaireService {
	private final Salaire_enseignantMapper enseignantMapper;
	private final Salaire_personnelMapper personnelMapper;
	private final Salaire_enseignantDAO enseignantDAO;
	private final Salaire_personnelDAO personnelDAO;
	private final PeriodeMapper periodeMapper;
	private final EnseingnantMapper enseignantMapper2;
	private final PersonnelMapper personnelMapper2;
	private final PeriodeDAO periodeDAO;
	private final PersonnelDAO personnelDAO2;
	private final EnseignantDAO enseignantDAO2;

	public PageResponse<Salaire_personnelDto> allPersonnel(final SearchRequest request,long id) {
		try {
			Page<Salaire_personnel> listPersonnel = personnelDAO
					.findByIsDeletedIsFalseAndPersonnelId(SearchRequestUtil.toPageRequest(request),id);
			log.info("Salaire personnel response successfully");
			return new PageResponse<Salaire_personnelDto>(
					personnelMapper.fromEntitiesToDtoList(listPersonnel.getContent()), listPersonnel.getSize(),
					listPersonnel.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting salaire personnel", e);
			return null;
		}
	}

	public List<Salaire_personnelDto> allPersonnelWithoutPagination() {
		try {
			List<Salaire_personnel> listPersonnel = personnelDAO.findByIsDeletedIsFalse();
			log.info("Salaire personnel response successfully");
			return personnelMapper.fromEntitiesToDtoList(listPersonnel);
		} catch (Exception e) {
			log.error("There was an error while getting salaire personnel", e);
			return null;
		}
	}

	public List<Salaire_personnelDto> allPersonnel() {
		try {
			List<Salaire_personnel> listPersonnel = personnelDAO.findByIsDeletedIsFalseOrderByDateAsc();
			log.info("Salaire personnel response successfully");
			return personnelMapper.fromEntitiesToDtoList(listPersonnel);
		} catch (Exception e) {
			log.error("There was an error while getting salaire personnel", e);
			return null;
		}
	}

	public PageResponse<Salaire_enseignantDto> allEnseigant(final SearchRequest request,long id) {
		try {
			Page<Salaire_enseignant> list = enseignantDAO.findByIsDeletedIsFalseAndEnseignantId(SearchRequestUtil.toPageRequest(request),id);
			log.info("Salaire enseignant response successfully");
			return new PageResponse<Salaire_enseignantDto>(enseignantMapper.fromEntitiesToDtoList(list.getContent()),
					list.getSize(), list.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting salaire enseignant", e);
			return null;
		}
	}

	public List<Salaire_enseignantDto> allEnseigantWithoutPagination() {
		try {
			List<Salaire_enseignant> list = enseignantDAO.findByIsDeletedIsFalse();
			log.info("Salaire enseignant response successfully");
			return enseignantMapper.fromEntitiesToDtoList(list);
		} catch (Exception e) {
			log.error("There was an error while getting salaire enseignant", e);
			return null;
		}
	}

	public List<Salaire_enseignantDto> allEnseigant() {
		try {
			List<Salaire_enseignant> list = enseignantDAO.findByIsDeletedIsFalseOrderByDateAsc();
			log.info("Salaire enseignant response successfully");
			return enseignantMapper.fromEntitiesToDtoList(list);
		} catch (Exception e) {
			log.error("There was an error while getting salaire enseignant", e);
			return null;
		}
	}

	public Salaire_personnelDto addPersonnel(Salaire_personnelDto salaire_personnelDto) {
		try {
			salaire_personnelDto.setPeriode(periodeMapper
					.fromEntityToDto(periodeDAO.findById(salaire_personnelDto.getPeriode().getId()).get()));
//			salaire_personnelDto.setPersonnel(personnelMapper2
//					.fromEntityToDto(personnelDAO2.findById(salaire_personnelDto.getPersonnel().getId()).get()));
			Salaire_personnel personnel = personnelMapper.fromDtoToEntity(salaire_personnelDto);
			personnel = this.personnelDAO.saveAndFlush(personnel);
			log.info("Salaire personnel with id= {} saved successfully", personnel.getId());
			return personnelMapper.fromEntityToDto(personnel);
		} catch (Exception e) {
			log.error("Cannot add salaire personnel", e);
			return null;
		}
	}

	public Salaire_enseignantDto addEnseignant(Salaire_enseignantDto salaire_enseignantDto) {
		try {
			salaire_enseignantDto.setPeriode(periodeMapper
					.fromEntityToDto(periodeDAO.findById(salaire_enseignantDto.getPeriode().getId()).get()));
//			salaire_enseignantDto.setEnseignant(enseignantMapper2
//					.fromEntityToDto(enseignantDAO2.findById(salaire_enseignantDto.getEnseignant().getId()).get()));
			Salaire_enseignant enseignant = enseignantMapper.fromDtoToEntity(salaire_enseignantDto);
			enseignant = this.enseignantDAO.saveAndFlush(enseignant);
			log.info("Salaire enseignant with id= {} saved successfully", enseignant.getId());
			return enseignantMapper.fromEntityToDto(enseignant);
		} catch (Exception e) {
			log.error("Cannot add salaire enseignant", e);
			return null;
		}
	}

	public Salaire_personnelDto removePersonnel(Long id) {
		Optional<Salaire_personnel> optional = personnelDAO.findById(id);
		if (optional.isPresent()) {
			Salaire_personnel personnel = optional.get();
			personnel.setDeleted(true);
			personnelDAO.saveAndFlush(personnel);
			log.info("Salire personnel with id= {} removed successfully", personnel.getId());
			return personnelMapper.fromEntityToDto(personnel);
		} else {
			log.error("Cannot get saliare personnel");
			return null;
		}
	}

	public Salaire_enseignantDto removeEnseignant(Long id) {
		Optional<Salaire_enseignant> optional = enseignantDAO.findById(id);
		if (optional.isPresent()) {
			Salaire_enseignant enseignant = optional.get();
			enseignant.setDeleted(true);
			enseignantDAO.saveAndFlush(enseignant);
			log.info("Salaire enseignant with id= {} removed successfully", enseignant.getId());
			return enseignantMapper.fromEntityToDto(enseignant);
		} else {
			log.error("Cannot get salaire enseignant");
			return null;
		}
	}

	public Salaire_personnelDto editPersonnel(Salaire_personnelDto personnelDto) {
		try {
			Optional<Salaire_personnel> optional = personnelDAO.findById(personnelDto.getId());
			if (optional.isPresent()) {
				Salaire_personnel personnel = optional.get();
				personnel.setMontant(personnelDto.getMontant());
				personnel.setDate_paiement(personnelDto.getDate_paiement());
				personnel.setMode_paiement(personnelDto.getMode_paiement());
				personnel.setNombre_heure_travaille(personnelDto.getNombre_heure_travaille());
				personnel.setDetails(personnelDto.getDetails());
				personnel.setPersonnel(personnelMapper2.fromDtoToEntity(personnelDto.getPersonnel()));
				personnelDAO.saveAndFlush(personnel);
				log.info("Salaire personnel with id= {} edited successfully", personnelDto.getId());
				return personnelMapper.fromEntityToDto(personnel);
			} else {
				log.error("Cannot get salaire personnel");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit salaire personnel", e);
			return null;
		}
	}

	public Salaire_enseignantDto editEnseignant(Salaire_enseignantDto enseignantDto) {
		try {
			Optional<Salaire_enseignant> optional = enseignantDAO.findById(enseignantDto.getId());
			if (optional.isPresent()) {
				Salaire_enseignant enseignant = optional.get();
				enseignant.setMontant(enseignantDto.getMontant());
				enseignant.setDate_paiement(enseignantDto.getDate_paiement());
				enseignant.setMode_paiement(enseignantDto.getMode_paiement());
				enseignant.setNombre_heure_travaille(enseignantDto.getNombre_heure_travaille());
				enseignant.setDetails(enseignantDto.getDetails());
				enseignant.setEnseignant(enseignantMapper2.fromDtoToEntity(enseignantDto.getEnseignant()));
				enseignantDAO.saveAndFlush(enseignant);
				log.info("Salaire enseignant with id= {} edited successfully", enseignantDto.getId());
				return enseignantMapper.fromEntityToDto(enseignant);
			} else {
				log.error("Cannot get salaire enseignant");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit salaire enseignant", e);
			return null;
		}
	}

}
