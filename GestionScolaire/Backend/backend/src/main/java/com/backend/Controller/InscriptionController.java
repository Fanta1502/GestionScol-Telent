package com.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.persistence.dto.InscriptionDto;
import com.backend.service.InscriptionService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/inscription")
public class InscriptionController {
	private final InscriptionService inscriptionService;
	@PostMapping
    public ResponseEntity<?> add(@RequestBody InscriptionDto inscriptionDto) {
        return ResponseEntity.ok(inscriptionService.add(inscriptionDto));
    }
}
