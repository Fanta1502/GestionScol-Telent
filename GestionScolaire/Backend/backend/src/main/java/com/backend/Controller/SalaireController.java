package com.backend.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.payload.request.SearchRequest;
import com.backend.persistence.dto.Salaire_enseignantDto;
import com.backend.persistence.dto.Salaire_personnelDto;
import com.backend.service.SalaireService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/salaire")
public class SalaireController {
	private final SalaireService salaireService;

	@GetMapping("/personnel/{id}")
	public ResponseEntity<?> allPersonnel(SearchRequest request,@PathVariable long id) {
		return ResponseEntity.ok(salaireService.allPersonnel(request,id));
	}
	@GetMapping("/personnel")
	public ResponseEntity<?> allPersonnel() {
		return ResponseEntity.ok(salaireService.allPersonnel());
	}

	@GetMapping("/enseignant/{id}")
	public ResponseEntity<?> allEnseignant(SearchRequest request,@PathVariable long id) {
		return ResponseEntity.ok(salaireService.allEnseigant(request,id));
	}
	@GetMapping("/personnelall")
	public ResponseEntity<?> allPersonnelWithoutPagination() {
		return ResponseEntity.ok(salaireService.allPersonnelWithoutPagination());
	}

	@GetMapping("/enseignantall")
	public ResponseEntity<?> allEnseignant() {
		return ResponseEntity.ok(salaireService.allEnseigantWithoutPagination());
	}

	@GetMapping("/enseignantgroup")
	public ResponseEntity<?> allEnseignantGroup() {
		return ResponseEntity.ok(salaireService.allEnseigant());
	}
	@DeleteMapping("/personnel/{id}")
	public ResponseEntity<?> removePersonnel(@PathVariable Long id) {
		return ResponseEntity.ok(salaireService.removePersonnel(id));
	}

	@DeleteMapping("/enseignant/{id}")
	public ResponseEntity<?> remove(@PathVariable Long id) {
		return ResponseEntity.ok(salaireService.removeEnseignant(id));
	}

	@PutMapping("/personnel")
	public ResponseEntity<?> editPersonnel(@RequestBody Salaire_personnelDto salaireDto) {
		return ResponseEntity.ok(salaireService.editPersonnel(salaireDto));
	}

	@PutMapping("/enseignant")
	public ResponseEntity<?> editenseigant(@RequestBody Salaire_enseignantDto salaireDto) {
		return ResponseEntity.ok(salaireService.editEnseignant(salaireDto));
	}

	@PostMapping("/personnel")
	public ResponseEntity<?> addpersonnel(@RequestBody Salaire_personnelDto salaireDto) {
		return ResponseEntity.ok(salaireService.addPersonnel(salaireDto));
	}

	@PostMapping("/enseignant")
	public ResponseEntity<?> add(@RequestBody Salaire_enseignantDto salaireDto) {
		return ResponseEntity.ok(salaireService.addEnseignant(salaireDto));
	}
}
