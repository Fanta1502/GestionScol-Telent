package com.backend.Controller;

import javax.mail.MessagingException;
import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.payload.request.LoginRequest;
import com.backend.payload.request.SearchRequest;
import com.backend.payload.response.EmailNotification;
import com.backend.persistence.dto.UtilisateurDto;
import com.backend.persistence.entities.Utilisateur;
import com.backend.service.AuthService;
import com.backend.service.EmailSenderService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;
    private EmailSenderService emailSenderService;

    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(authService.remove(id));
    }
   /* @PostMapping("/verif")
    public ResponseEntity<?> verifPassword(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.verifPassword(loginRequest));

    }*/
    @PutMapping("/edit-user-settings")
    public ResponseEntity<?> editUserSettings(@RequestBody UtilisateurDto userDto){
        return ResponseEntity.ok(authService.editUserSettings(userDto));

    }
    @GetMapping("/all")
    public ResponseEntity<?> all(SearchRequest request){
        return ResponseEntity.ok(authService.getAllUser(request));
    }
    @GetMapping("/user")
    public ResponseEntity<?> getUser(@RequestParam Long id){
        return ResponseEntity.ok(authService.getUser(id));
    }
    @GetMapping("/user/find")
    public ResponseEntity<?> getUser(@RequestParam String mail){
        return ResponseEntity.ok(authService.getUser(mail));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Utilisateur user){
        return ResponseEntity.ok(authService.registerUser(user));
    }
    @PostMapping("/send-email")
    public ResponseEntity<?> sendVerificationMail(@RequestBody EmailNotification mail) throws MessagingException {
    	return ResponseEntity.ok(emailSenderService.sendForgetPasswordMail(mail));
    }

    @GetMapping("/forgot-password")
    public ResponseEntity<?> registerUser(@RequestParam String email){
        return ResponseEntity.ok(authService.forgotPassword(email));
    }
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Utilisateur userDto){
        return ResponseEntity.ok(authService.resetPassword(userDto));
    }
    @PostMapping("/verif")
    public ResponseEntity<?> verifPassword(@Valid @RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.verifPassword(loginRequest));

    }
}

