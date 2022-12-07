package com.backend.persistence.entities;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.EqualsAndHashCode.Include;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Entity
@Table(name = "t_etablissement")
public class Etablissement extends TimestampEntity implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Include
	    private Long id;
	    @NonNull
	    private String nom;
	    @NonNull
	    private String sigle;
	    @NonNull
	    private String superficie;
	    @NonNull
	    private String reference_foncier;
	    @NonNull
	    private String adresse;
	    @NonNull
	    private String telephone;
	    @NonNull
	    private String email;
	    private String status;
	    private String description;
	    @NonNull
	    private Date date_ouverture;
	    @NonNull
	    private String nom_prenom_promoteur;
	    private int capacite_accueil;
	    private int nb_salle_ordinaire;
	    private int nb_salle_specialisee;
	    @NonNull
	    private String nom_prenom_proviseur;	
		@Lob
		private String logo;
		private boolean isDeleted = false;
		@OneToMany
		private List<Classe> classes;
		@OneToMany
		private List<Personnel> personnels;
}
