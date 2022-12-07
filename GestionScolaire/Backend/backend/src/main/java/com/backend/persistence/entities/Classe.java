package com.backend.persistence.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
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
@Table(name = "t_classes")
public class Classe extends TimestampEntity implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Include
	    private Long id;
	    @NonNull
	    private String nom_classe;
	    @NonNull
	    private String niveau_classe;
	    @NonNull
	    private String sequence_classe;
	    @NonNull
	    private String nombre_places;
	    @NonNull
	    private String capacite_max_classe;
	    private double montant_scolarite;
	    @OneToMany
	    private List<Inscription> inscriptions;
	    private boolean isDeleted=false;
	    @OneToOne
	    private Enseignant enseignant;
}
