package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.ClasseDto;
import com.backend.persistence.entities.Classe;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface ClasseMapper extends GenericMapper<ClasseDto, Classe> {

}