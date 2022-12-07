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
public class EtablissementDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
    private String nom;
    private String sigle;
    private String superficie;
    private String reference_foncier;
    private String adresse;
    private String telephone;
    private String email;
    private String status;
    private String description;
    private Date date_ouverture;
    private String nom_prenom_promoteur;
    private int capacite_accueil;
    private int nb_salle_ordinaire;
    private int nb_salle_specialisee;
    private String nom_prenom_proviseur;	
	private String logo;
}
