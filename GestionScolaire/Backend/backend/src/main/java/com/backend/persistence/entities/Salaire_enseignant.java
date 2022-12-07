package com.backend.persistence.entities;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
@Table(name = "t_salaire_enseignant")
public class Salaire_enseignant extends TimestampEntity implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Include
	    private Long id;
	    private int montant;
	    @NonNull
	    private Date date_paiement;
	    private Date date = date_paiement;
	    @NonNull
	    private String mode_paiement;
	    private int nombre_heure_travaille;
	    private String details;
	    @ManyToOne
	    private Periode periode;
	    @ManyToOne
	    private Enseignant enseignant;
	    private boolean isDeleted = false;
}
