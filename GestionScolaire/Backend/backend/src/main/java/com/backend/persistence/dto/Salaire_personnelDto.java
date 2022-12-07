package com.backend.persistence.dto;

import java.io.Serializable;
import java.sql.Date;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
public class Salaire_personnelDto implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    private Long id;
	    private int montant;
	    private Date date_paiement;
	    private String mode_paiement;
	    private int nombre_heure_travaille;
	    private String details;
	    private PeriodeDto periode;
	    private PersonnelDto personnel;
}
