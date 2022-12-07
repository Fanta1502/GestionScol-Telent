package com.backend.persistence.dto;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

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
public class PersonnelDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
    private String matricule;
    private String nom;
    private String prenom;
    private String genre;
    private Date date_naissance;
    private String lieu_naissance;
    private String adresse;
    private String telephone;
    private String nationalite;
    private String fonction;
    private String role;
    private String statut;
    private Date date_recrutement;
    private String type_contrat;
    private String duree_contrat;
}
