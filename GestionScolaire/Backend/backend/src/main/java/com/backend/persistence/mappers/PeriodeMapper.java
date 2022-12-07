package com.backend.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

import com.backend.persistence.dto.PeriodeDto;
import com.backend.persistence.entities.Periode;

@Component
@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface PeriodeMapper extends GenericMapper<PeriodeDto, Periode> {

}
