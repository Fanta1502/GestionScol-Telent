package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.MensualiteDto;
import com.backend.persistence.entities.Mensualite;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface MensualiteMapper extends GenericMapper<MensualiteDto, Mensualite> {

}
