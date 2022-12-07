package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.EleveDto;
import com.backend.persistence.entities.Eleve;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface EleveMapper  extends GenericMapper<EleveDto, Eleve> {

}
