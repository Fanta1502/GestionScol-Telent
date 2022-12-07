package com.backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.ClasseDAO;
import com.backend.persistence.dto.ClasseDto;
import com.backend.persistence.entities.Classe;
import com.backend.persistence.mappers.ClasseMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class ClasseService {
	private final ClasseDAO classeDAO;
	private final ClasseMapper classeMapper;
	public PageResponse<ClasseDto> all(final SearchRequest request)
	{
		try {
			Page<Classe> classes = classeDAO.findByIsDeletedIsFalse(SearchRequestUtil.toPageRequest(request));
			log.info("Classe response successfully");
			return new PageResponse<ClasseDto>(classeMapper.fromEntitiesToDtoList(classes.getContent()), classes.getSize(),classes.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting classe", e);
			return null;
		}		
	}
	public ClasseDto add(ClasseDto classeDto) {
		try {
			Classe classe = classeMapper.fromDtoToEntity(classeDto);
			classe = this.classeDAO.saveAndFlush(classe);
			log.info("Classe with id= {} saved successfully", classe.getId());
			return classeMapper.fromEntityToDto(classe);
		} catch (Exception e) {
			log.error("Cannot add classe ", e);
			return null;
		}
	}
	public ClasseDto edit(ClasseDto classeDto) {
		try {
			Optional<Classe> optional = classeDAO.findById(classeDto.getId());
			if (optional.isPresent()) {
				Classe classe = optional.get();
				classe.setNom_classe(classeDto.getNom_classe());
				classe.setNiveau_classe(classeDto.getNiveau_classe());
				classe.setNombre_places(classeDto.getNombre_places());
				classe.setSequence_classe(classeDto.getSequence_classe());
				classe.setCapacite_max_classe(classeDto.getCapacite_max_classe());
				classe.setMontant_scolarite(classeDto.getMontant_scolarite());
				classeDAO.saveAndFlush(classe);
				log.info("Classe with id= {} edited successfully", classeDto.getId());
				return classeMapper.fromEntityToDto(classe);
			} else {
				log.error("Cannot get classe");
				return null;
			}
		} catch (Exception e) {
			log.error("Cannot edit classe", e);
			return null;
		}
	}
	public ClasseDto remove(Long id) {
		Optional<Classe> optional = classeDAO.findById(id);
		if (optional.isPresent()) {
			Classe classe = optional.get();
			classe.setDeleted(true);
			classeDAO.saveAndFlush(classe);
			log.info("Classe with id= {} removed successfully",classe.getId());
			return classeMapper.fromEntityToDto(classe);
		} else {
			log.error("Cannot get classe");
			return null;
		}
	}

	public List<ClasseDto> allWhithoutPagination()
	{
		try {
			List<Classe> classes = classeDAO.findByIsDeletedIsFalse();
			log.info("Classe response successfully");
			return classeMapper.fromEntitiesToDtoList(classes);
		} catch (Exception e) {
			log.error("There was an error while getting classe", e);
			return null;
		}		
	}
}