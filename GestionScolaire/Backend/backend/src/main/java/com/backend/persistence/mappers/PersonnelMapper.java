package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.PersonnelDto;
import com.backend.persistence.entities.Personnel;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface PersonnelMapper extends GenericMapper<PersonnelDto, Personnel>{

}
