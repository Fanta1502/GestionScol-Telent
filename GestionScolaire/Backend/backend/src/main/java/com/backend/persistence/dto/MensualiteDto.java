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
public class MensualiteDto implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private Date date_paiement;
	private int montant;
	private int montant_paye;
	private int montant_restant;
	private String mode_paiement;
	private String nom_prenom_payeur;
	private PeriodeDto periode;
	private EleveDto eleve;
}
