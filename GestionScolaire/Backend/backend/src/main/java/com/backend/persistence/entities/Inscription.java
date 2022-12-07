package com.backend.persistence.entities;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.*;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.EqualsAndHashCode.Include;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true, callSuper = false)
@Entity
@ToString
@Table(name = "t_inscription")
public class Inscription extends TimestampEntity implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Include
	    private Long id;
	    @NonNull
	    private Date date_inscription; 
	    @NonNull
	    private String mode_paiement;
	    private int montant_inscription;
	    @NonNull
	    private String nom_prenom_payeur; 
	    @ManyToOne
	    private Classe classe;    
	    @ManyToOne
	    private AnneeScolaire anneeScolaire;
	    @OneToOne
	    private Eleve eleve;
	    private boolean isDeleted = false;
}
