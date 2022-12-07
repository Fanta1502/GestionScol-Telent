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
@Table(name = "t_mensualite")
public class Mensualite extends TimestampEntity implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Include
	    private Long id;
	    @NonNull
	    private Date date_paiement;	
	    private int montant;
	    private int montant_paye;
	    private int montant_restant;
	    @NonNull
	    private String mode_paiement;
	    @NonNull
	    private String nom_prenom_payeur;
	    @ManyToOne
	    private Eleve eleve;
	    @ManyToOne
	    private Periode periode;
	    private boolean isDeleted = false;
}
