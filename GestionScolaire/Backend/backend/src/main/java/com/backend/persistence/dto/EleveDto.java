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
public class EleveDto implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String matricule;
    private String nom;
    private String prenom;
    private String genre;
    private Date date_naissance;
    private String lieu_naissance;
    private String adresse;
    private String telephone;
    private String email_parent;
    private String prenom_pere;
    private String nom_prenom_mere;
    private String profession_pere;
    private String profession_mere;
    private String handicap_particuliers;
    private String maladies_particulieres;
	private String niveau;
}
