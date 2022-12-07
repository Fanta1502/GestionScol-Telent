package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.EtablissementDto;
import com.backend.persistence.entities.Etablissement;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface EtablissementMapper extends GenericMapper<EtablissementDto, Etablissement> {

}
