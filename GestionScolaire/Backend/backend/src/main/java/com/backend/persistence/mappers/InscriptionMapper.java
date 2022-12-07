package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.InscriptionDto;
import com.backend.persistence.entities.Inscription;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface InscriptionMapper extends GenericMapper<InscriptionDto, Inscription>{

}
