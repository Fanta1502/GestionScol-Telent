package com.backend.persistence.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
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
@Table(name = "t_user")
public class Utilisateur extends TimestampEntity implements Serializable {
    private static final long serialVersionUID = 1L;
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Include
    private Long id;
    @NonNull
    private String username;
    @NonNull
    private String nom;
    @NonNull
    private String prenom;
    @NonNull
    private String email;
    @NonNull
    private String password;
    @NonNull
    private String telephone;
    @NonNull
    private String poste;
    @NonNull
    private String role;	
	@Lob
	private String profilPicture;
	private boolean isDeleted = false;
}