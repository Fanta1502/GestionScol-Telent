package com.backend.persistence.dto;

import java.io.Serializable;
import java.sql.Date;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
public class AnneeScolaireDto  implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String libele_annee_scolaire;
	private Date date_debut_annee_scolaire;
	private Date date_fin_annee_scolaire;
}
