package com.backend.persistence.dto;

import java.io.Serializable;

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
public class ClasseDto  implements Serializable {
	 private static final long serialVersionUID = 1L;
	    private Long id;
	    private String nom_classe;
	    private String niveau_classe;
	    private String sequence_classe;
	    private String nombre_places;
	    private String capacite_max_classe;
	    private double montant_scolarite;
}
