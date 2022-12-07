package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.Salaire_personnelDto;
import com.backend.persistence.entities.Salaire_personnel;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface Salaire_personnelMapper extends GenericMapper<Salaire_personnelDto, Salaire_personnel>{

}
