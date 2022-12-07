package com.backend.persistence.dto;

import java.io.Serializable;
import java.time.LocalDate;

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
public class EncaissementDto implements Serializable{

	 private static final long serialVersionUID = 1L;
	    private long id;
	    private String libelle;
	    private double montant;
	    private String mode_paiement;
	    private LocalDate date;
	    private boolean isDeleted = false;
}
