package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.EncaissementDto;
import com.backend.persistence.entities.Encaissement;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface EncaissementMapper extends GenericMapper<EncaissementDto, Encaissement> {
}
