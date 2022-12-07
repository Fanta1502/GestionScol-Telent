package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.UtilisateurDto;
import com.backend.persistence.entities.Utilisateur;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface UtilisateurMapper extends GenericMapper<UtilisateurDto, Utilisateur> {
}
