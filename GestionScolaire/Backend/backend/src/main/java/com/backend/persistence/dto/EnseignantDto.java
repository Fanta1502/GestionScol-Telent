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
public class EnseignantDto  implements Serializable {
	 private static final long serialVersionUID = 1L;
	    private Long id;
	    private String matricule;
	    private String nom;
	    private String prenom;
	    private String genre;
	    private String adresse;
	    private String telephone;
	    private String email;
	    private Date date_naissance;
	    private String lieu_naissance;
	    private String nationalite;
	    private Date date_recrutement;
	    private String specialite;
	    private String dernier_diplome;
	    private String etat_contractuel;
	    private ClasseDto classe;
}
