package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.PeriodeDAO;
import com.backend.persistence.dto.PeriodeDto;
import com.backend.persistence.entities.Periode;
import com.backend.persistence.mappers.PeriodeMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class PeriodeService {
	private final PeriodeDAO periodeDAO;
	private final PeriodeMapper periodeMapper;
	public PageResponse<PeriodeDto> all(final SearchRequest request)
	{
		try {
			Page<Periode> periodes = periodeDAO.findByIsDeletedIsFalse(SearchRequestUtil.toPageRequest(request));
			log.info("Periode response successfully");
			return new PageResponse<PeriodeDto>(periodeMapper.fromEntitiesToDtoList(periodes.getContent()), periodes.getSize(),periodes.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting periode", e);
			return null;
		}		
	}
	public List<PeriodeDto> all()
	{
		try {
			List<Periode> periodes = periodeDAO.findByIsDeletedIsFalse();
			log.info("Periode response successfully");
			return periodeMapper.fromEntitiesToDtoList(periodes);
		} catch (Exception e) {
			log.error("There was an error while getting periode", e);
			return null;
		}		
	}
	public PageResponse<PeriodeDto> allByAnneeScolaire(final SearchRequest request,long id)
	{
		try {
			Page<Periode> periodes = periodeDAO.findByIsDeletedIsFalseAndAnneeScolaireId(SearchRequestUtil.toPageRequest(request),id);
			log.info("Periode response successfully");
			return new PageResponse<PeriodeDto>(periodeMapper.fromEntitiesToDtoList(periodes.getContent()), periodes.getSize(),periodes.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting periode", e);
			return null;
		}		
	}
	public PeriodeDto add(PeriodeDto periodeDto) {
		try {
			Periode periode = periodeMapper.fromDtoToEntity(periodeDto);
			periode = this.periodeDAO.saveAndFlush(periode);
			log.info("Periode with id= {} saved successfully", periode.getId());
			return periodeMapper.fromEntityToDto(periode);
		} catch (Exception e) {
			log.error("Cannot add periode ", e);
			return null;
		}
	}
	public PeriodeDto edit(PeriodeDto periodeDto) {
		try {
			Optional<Periode> optional = periodeDAO.findById(periodeDto.getId());
			if (optional.isPresent()) {
				Periode periode = optional.get();
				periode.setLibelle_periode(periodeDto.getLibelle_periode());
				periode.setDate_debut_periode(periodeDto.getDate_debut_periode());
				periode.setDate_fin_periode(periodeDto.getDate_fin_periode());
				periodeDAO.saveAndFlush(periode);
				log.info("periode with id= {} edited successfully", periodeDto.getId());
				return periodeMapper.fromEntityToDto(periode);
			} else {
				log.error("Cannot get periode");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit periode", e);
			return null;
		}
	}
	public PeriodeDto remove(Long id) {
		Optional<Periode> optional = periodeDAO.findById(id);
		if (optional.isPresent()) {
			Periode periode = optional.get();
			periode.setDeleted(true);
			periodeDAO.saveAndFlush(periode);
			log.info("Periode with id= {} removed successfully",periode.getId());
			return periodeMapper.fromEntityToDto(periode);
		} else {
			log.error("Cannot get periode");
			return null;
		}
	}
}