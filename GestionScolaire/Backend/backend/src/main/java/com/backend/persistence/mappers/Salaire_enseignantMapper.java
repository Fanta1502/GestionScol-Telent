package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.Salaire_enseignantDto;
import com.backend.persistence.entities.Salaire_enseignant;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface Salaire_enseignantMapper extends GenericMapper<Salaire_enseignantDto, Salaire_enseignant>{

}
