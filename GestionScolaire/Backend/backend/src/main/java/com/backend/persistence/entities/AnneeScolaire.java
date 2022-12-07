package com.backend.persistence.entities;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "t_annee_scolaire")
public class AnneeScolaire extends TimestampEntity implements Serializable{
	 private static final long serialVersionUID = 1L;
	 
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Include
	    private Long id;
	    private String libele_annee_scolaire;
	    @NonNull
	    private Date date_debut_annee_scolaire;
	    @NonNull
	    private Date date_fin_annee_scolaire;
	    @OneToMany
	    private List<Inscription>  inscriptions;
	    private boolean isDeleted = false;
	    @OneToMany
	    private List<Periode> periodes;
}
