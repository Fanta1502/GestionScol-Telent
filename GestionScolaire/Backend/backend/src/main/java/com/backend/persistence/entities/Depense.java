package com.backend.persistence.entities;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "t_depense")
public class Depense  extends TimestampEntity implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Include
	    private long id;
	    @NonNull
	    private String libelle;
	    private double montant;
	    @NonNull
	    private String mode_paiement;
	    @NonNull
	    private String fournisseur;
	    @NonNull
	    private String responsable;
	    @NonNull
	    private String motif;
	    @NonNull
	    private LocalDate date;
	    @NonNull
	    private String type;
	    private boolean isDeleted = false;
	    @Override
	    public String toString() {
	    	return date + ": " + montant;
	    }
}
