package com.backend.service;

import org.springframework.stereotype.Service;

import com.backend.persistence.dao.AnneeScolaireDAO;
import com.backend.persistence.dao.ClasseDAO;
import com.backend.persistence.dao.EleveDAO;
import com.backend.persistence.dao.InscriptionDAO;
import com.backend.persistence.dto.InscriptionDto;
import com.backend.persistence.entities.Eleve;
import com.backend.persistence.entities.Inscription;
import com.backend.persistence.mappers.AnneeScolaireMapper;
import com.backend.persistence.mappers.ClasseMapper;
import com.backend.persistence.mappers.EleveMapper;
import com.backend.persistence.mappers.InscriptionMapper;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class InscriptionService {
	private final InscriptionDAO inscriptionDAO;
	private final InscriptionMapper inscriptionMapper;
	private final EleveMapper eleveMapper;
	private final EleveDAO eleveDAO;
	private final ClasseDAO classeDAO;
	private final ClasseMapper classeMapper;
	private final AnneeScolaireDAO anneeScolaireDAO;
	private final AnneeScolaireMapper anneeScolaireMapper;

	public InscriptionDto add(InscriptionDto inscriptionDto) {
		try {
			inscriptionDto.setClasse(classeMapper.fromEntityToDto(classeDAO.findById(inscriptionDto.getClasse().getId()).get()));
			inscriptionDto.setAnneeScolaire(anneeScolaireMapper.fromEntityToDto(anneeScolaireDAO.findById(inscriptionDto.getAnneeScolaire().getId()).get()));
			Inscription inscription = inscriptionMapper.fromDtoToEntity(inscriptionDto);
			Eleve eleve = this.eleveDAO.findByMatriculeAndIsDeletedIsFalse(inscriptionDto.getEleve().getMatricule());
			if (eleve == null) {
				eleve = eleveMapper.fromDtoToEntity(inscriptionDto.getEleve());
				inscription.setEleve(this.eleveDAO.saveAndFlush(eleve));
			} else
				inscription.setEleve(eleveMapper.fromDtoToEntity(inscriptionDto.getEleve()));
			inscription.setClasse(classeDAO.findById(inscriptionDto.getClasse().getId()).get());
			inscription.setAnneeScolaire(anneeScolaireDAO.findById(inscriptionDto.getAnneeScolaire().getId()).get());
			this.inscriptionDAO.saveAndFlush(inscription);
			eleve.setInscription(inscription);
			eleve.setNiveau(inscription.getClasse().getNom_classe());
			this.eleveDAO.saveAndFlush(eleve);
			log.info("Inscription with id= {} saved successfully", inscription.getId());
			return inscriptionMapper.fromEntityToDto(inscription);
		} catch (Exception e) {
			log.error("Cannot add inscription ", e);
			return null;
		}
	}
}
