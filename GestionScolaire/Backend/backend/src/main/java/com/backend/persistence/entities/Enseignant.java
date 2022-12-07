package com.backend.persistence.entities;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
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
@Table(name = "t_enseignant")
public class Enseignant extends TimestampEntity implements Serializable{
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
	    private String adresse;
	    @NonNull
	    private String telephone;
	    @NonNull
	    private String email;
	    @NonNull
	    private Date date_naissance;
	    @NonNull
	    private String lieu_naissance;
	    @NonNull
	    private String nationalite;
	    @NonNull
	    private Date date_recrutement;
	    @NonNull
	    private String specialite;
	    @NonNull
	    private String dernier_diplome;
	    @NonNull
	    private String etat_contractuel;
	    private boolean isDeleted = false;
	    @OneToMany
	    private List<Salaire_enseignant>salaire_enseignants; 
	    @OneToOne
	    private Classe classe;
}
