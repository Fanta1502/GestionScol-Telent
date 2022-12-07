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
import com.backend.persistence.dto.PeriodeDto;
import com.backend.service.PeriodeService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/periode")
public class PeriodeController {
	private final PeriodeService periodeService;

	@GetMapping
	public ResponseEntity<?> all(SearchRequest request) {
		return ResponseEntity.ok(periodeService.all(request));
	}

	@GetMapping("/all")
	public ResponseEntity<?> all() {
		return ResponseEntity.ok(periodeService.all());
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> allByAnneeScolaire(SearchRequest request, @PathVariable long id) {
		return ResponseEntity.ok(periodeService.allByAnneeScolaire(request, id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> remove(@PathVariable Long id) {
		return ResponseEntity.ok(periodeService.remove(id));
	}

	@PutMapping
	public ResponseEntity<?> edit(@RequestBody PeriodeDto periodeDto) {
		return ResponseEntity.ok(periodeService.edit(periodeDto));
	}

	@PostMapping
	public ResponseEntity<?> add(@RequestBody PeriodeDto periodeDto) {
		return ResponseEntity.ok(periodeService.add(periodeDto));
	}
}
