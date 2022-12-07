package com.backend.persistence.entities;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
@Table(name = "t_personnel")
public class Personnel extends TimestampEntity implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Include
	    private Long id;
	    @NonNull
	    private String matricule;
	    @NonNull
	    private String nom;
	    @NonNull
	    private String prenom;
	    @NonNull
	    private String genre;
	    @NonNull
	    private Date date_naissance;
	    @NonNull
	    private String lieu_naissance;
	    @NonNull
	    private String adresse;
	    @NonNull
	    private String telephone;
	    @NonNull
	    private String nationalite;
	    @NonNull
	    private String fonction;
	    @NonNull
	    private String role;
	    @NonNull
	    private String statut;
	    @NonNull
	    private Date date_recrutement;
	    @NonNull
	    private String type_contrat;
	    @NonNull
	    private String duree_contrat;
	    @ManyToOne
	    private Etablissement etablissement;
	    private boolean isDeleted = false;
	    @OneToMany
	    private List<Salaire_personnel> salaire_personnels;
}
