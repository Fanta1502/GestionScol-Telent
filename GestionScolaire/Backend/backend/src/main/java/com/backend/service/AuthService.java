package com.backend.service;

import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

import javax.mail.Multipart;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.payload.request.LoginRequest;
import com.backend.payload.request.SearchRequest;
import com.backend.payload.request.SearchRequestUtil;
import com.backend.payload.response.JwtResponse;
import com.backend.payload.response.PageResponse;
import com.backend.persistence.dao.UtilisateurDAO;
import com.backend.persistence.dto.UtilisateurDto;
import com.backend.persistence.dto.UtilisateurDto;
import com.backend.persistence.entities.Utilisateur;
import com.backend.persistence.entities.Utilisateur;
import com.backend.persistence.mappers.UtilisateurMapper;
import com.backend.security.jwt.JwtUtils;
import com.backend.security.services.UserDetailsImpl;
import com.backend.security.services.UserDetailsServiceImpl;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@AllArgsConstructor
public class AuthService {
	@Value("${gestionScol.frontendUrl}")
	private String frontendUrl;
	@Autowired
	private JavaMailSender javaMailSender;
	private final AuthenticationManager authenticationManager;

	private final UtilisateurDAO userRepository;
	private final UtilisateurMapper userMapper;

	private final UserDetailsServiceImpl userDetailsServiceImpl;
	private final JwtUtils jwtUtils;
	private final PasswordEncoder passwordEncoder;

	@Autowired
	public AuthService(AuthenticationManager authenticationManager, UtilisateurDAO userRepository,
			UtilisateurMapper userMapper, UserDetailsServiceImpl userDetailsServiceImpl, JwtUtils jwtUtils,
			PasswordEncoder passwordEncoder) {
		super();
		this.authenticationManager = authenticationManager;
		this.userRepository = userRepository;
		this.userMapper = userMapper;
		this.userDetailsServiceImpl = userDetailsServiceImpl;
		this.jwtUtils = jwtUtils;
		this.passwordEncoder = passwordEncoder;
	}

	public JwtResponse login(LoginRequest loginRequest) {
		Authentication authentication = null;
		try {
			try {
				authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
						loginRequest.getUsername(), loginRequest.getPassword()));
			} catch (BadCredentialsException e) {
				return null;
			}
			SecurityContextHolder.getContext().setAuthentication(authentication);
			UserDetailsImpl userDetails = (UserDetailsImpl) userDetailsServiceImpl
					.loadUserByUsername(loginRequest.getUsername());
			String jwt = jwtUtils.generateJwtToken(userDetails);
			List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
					.collect(Collectors.toList());
			JwtResponse newJwtResponse = new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(),
					userDetails.getEmail(), roles);
			log.info("User {} successfuly connected", loginRequest.getUsername());
			return newJwtResponse;
		} catch (Exception e) {
			log.error("User cannot be authenticated", e);
		}
		return null;

	}

	public boolean verifPassword(LoginRequest loginRequest) {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
		} catch (BadCredentialsException e) {
			return false;
		}
		return true;
	}

	public Utilisateur resetPassword(Utilisateur userDto) {
		try {
			Utilisateur user = userRepository.findOneById(userDto.getId());
			user.setPassword(passwordEncoder.encode(userDto.getPassword()));
			userRepository.saveAndFlush(user);
			log.info("Password reseted successfully");
			return user;
		} catch (Exception e) {
			log.error("An error occured while getting user {}", e);

			return null;
		}
	}

	public UtilisateurDto editUserSettings(UtilisateurDto userBody) {
		try {
			Utilisateur user = userRepository.findOneById(userBody.getId());
			user.setNom(userBody.getNom());
			user.setUsername(userBody.getUsername());
			user.setPrenom(userBody.getPrenom());
			user.setEmail(userBody.getEmail());
			user.setTelephone(userBody.getTelephone());
			user.setPoste(userBody.getPoste());
			if (userBody.getProfilPicture() != "")
				user.setProfilPicture(userBody.getProfilPicture());
			userRepository.saveAndFlush(user);
			UtilisateurDto userDto = userMapper.fromEntityToDto(user);
			log.info("User (id={}) updated successfully", user.getId());
			return userDto;
		} catch (Exception e) {
			log.error("An error occured while updating user ", e);
			return null;
		}

	}

	public UtilisateurDto remove(Long id) {
		Optional<Utilisateur> optional = userRepository.findById(id);
		if (optional.isPresent()) {
			Utilisateur utilisateur = optional.get();
			utilisateur.setDeleted(true);
			userRepository.saveAndFlush(utilisateur);
			log.info("Utilisateur with id= {} removed successfully",utilisateur.getId());
			return userMapper.fromEntityToDto(utilisateur);
		} else {
			log.error("Cannot get Utilisateur");
			return null;
		}
	}
	public UtilisateurDto getUser(Long id) {
		try {
			Utilisateur user = userRepository.findOneById(id);
			UtilisateurDto userDto = userMapper.fromEntityToDto(user);
			log.info("User response successfully");
			return userDto;
		} catch (Exception e) {
			log.error("There was an error while getting user", e);
			return null;
		}

	}

	public PageResponse<UtilisateurDto> getAllUser(SearchRequest request) {
		try {
			Page<Utilisateur> user = userRepository.findByIsDeletedIsFalse(SearchRequestUtil.toPageRequest(request));
			log.info("User response successfully");
			return new PageResponse<UtilisateurDto>(userMapper.fromEntitiesToDtoList(user.getContent()), user.getSize(),
					user.getTotalElements());
		} catch (Exception e) {
			log.error("There was an error while getting user", e);
			return null;
		}

	}

	public UtilisateurDto getUser(String mail) {
		try {
			Optional<Utilisateur> user = userRepository.findByEmail(mail);
			UtilisateurDto userDto = userMapper.fromEntityToDto(user.get());
			log.info("User response successfully");
			return userDto;
		} catch (Exception e) {
			log.error("There was an error while getting user", e);
			return null;
		}

	}

	public UtilisateurDto registerUser(Utilisateur user) {
		try {
			int leftLimit = 48;
			int rightLimit = 122;
			int targetStringLength = 8;
			Random random = new Random();
			String generatedString = random.ints(leftLimit, rightLimit + 1)
					.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)).limit(targetStringLength)
					.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
			user.setPassword(passwordEncoder.encode(generatedString));
			user = userRepository.saveAndFlush(user);
			UtilisateurDto userDto = userMapper.fromEntityToDto(user);
			log.info("User added successfully");
			try {
				String messageText ="Votre compte utilisateur a été crée avec succès ! <br> Vos identifiant :<br> Nom d'utilisateur : <b>" + user.getUsername() + "</b><br> Mot de passe : <b>"+generatedString+"</b><br Cordialement,>"; 
				MimeMessage message = javaMailSender.createMimeMessage();
				MimeMessageHelper helper = new MimeMessageHelper(message, true);
				helper.setTo(user.getEmail());
				helper.setSubject("Mot de passe de votre compte utilisateur");
				helper.setText(messageText, true);
				Multipart multipart = new MimeMultipart("alternative");
				MimeBodyPart htmlPart = new MimeBodyPart();
				htmlPart.setContent(messageText, "text/html;");
				multipart.addBodyPart(htmlPart);
				message.setContent(multipart);
				javaMailSender.send(message);
			} catch (Exception e) {
				log.error("Cannot forget password mail", e);
			}
			return userDto;
		} catch (Exception e) {
			log.error("There was an error while posting user {}", user.getId(), e);
			return null;
		}
	}

	public UtilisateurDto forgotPassword(String email) {
		try {
			Utilisateur user = userRepository.findOneByEmail(email);
			int leftLimit = 48;
			int rightLimit = 122;
			int targetStringLength = 16;
			Random random = new Random();
			String generatedString = random.ints(leftLimit, rightLimit + 1)
					.filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97)).limit(targetStringLength)
					.collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append).toString();
			user.setPassword(passwordEncoder.encode(generatedString));
			userRepository.saveAndFlush(user);
			log.info("Forgot password mail sended successfully");
			return userMapper.fromEntityToDto(user);

		} catch (Exception e) {
			log.error("An error occured while getting user {}", e);

			return null;

		}
	}
}