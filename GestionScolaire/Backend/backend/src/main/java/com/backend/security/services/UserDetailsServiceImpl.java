package com.backend.security.services;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.persistence.dao.UtilisateurDAO;
import com.backend.persistence.entities.Utilisateur;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UtilisateurDAO userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       Utilisateur user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + username));
        return UserDetailsImpl.build(user);
    }

    @Transactional
    public UserDetails loadUserById(Long id) {
        Utilisateur user = userRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return UserDetailsImpl.build(user);
    }

}
