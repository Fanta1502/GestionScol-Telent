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
@Table(name = "t_eleve")
public class Eleve extends TimestampEntity implements Serializable{
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
	    private String email_parent;
	    @NonNull
	    private String prenom_pere;
	    @NonNull
	    private String nom_prenom_mere;
	    @NonNull
	    private String profession_pere;
	    @NonNull
	    private String profession_mere;
	    private String handicap_particuliers;
	    private String maladies_particulieres;
		private boolean isDeleted = false;
		@OneToOne
		private Inscription inscription;
		@OneToMany
		private List<Mensualite> mensualite;
		private String niveau;
}
