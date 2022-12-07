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
public class UtilisateurDto implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String email;
    private String password;
	private String profilPicture;
    private String role;
    private String username;
    private String nom;
    private String prenom;
    private String telephone;
    private String poste;
}
