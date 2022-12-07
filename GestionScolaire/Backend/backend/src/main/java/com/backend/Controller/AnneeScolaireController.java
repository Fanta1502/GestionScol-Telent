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
import com.backend.persistence.dto.AnneeScolaireDto;
import com.backend.service.AnneeScolaireService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/annee_scolaire")
public class AnneeScolaireController {
	private final AnneeScolaireService anneeScolaireService;
	@GetMapping
	public ResponseEntity<?> all(SearchRequest request)
	{
		return ResponseEntity.ok(anneeScolaireService.all(request));
	}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(anneeScolaireService.remove(id));
    }

	@GetMapping("/all")
	public ResponseEntity<?> all()
	{
		return ResponseEntity.ok(anneeScolaireService.allWhithoutPagination());
	}
    @PutMapping
    public ResponseEntity<?> edit(@RequestBody AnneeScolaireDto anneeScolaire) {
        return ResponseEntity.ok(anneeScolaireService.edit(anneeScolaire));
    }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody AnneeScolaireDto anneeScolaire) {
        return ResponseEntity.ok(anneeScolaireService.add(anneeScolaire));
    }
}