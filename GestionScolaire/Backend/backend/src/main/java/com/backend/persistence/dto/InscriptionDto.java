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
public class InscriptionDto  implements Serializable {
	private static final long serialVersionUID = 1L;
	 
    private Long id;
    private Date date_inscription; 
    private String mode_paiement;
    private int montant_inscription;
    private String nom_prenom_payeur;
    private EleveDto eleve;
    private ClasseDto classe;
    private AnneeScolaireDto anneeScolaire;
}
