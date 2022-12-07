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
import com.backend.persistence.dto.EnseignantDto;
import com.backend.service.EnseignantService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/enseignant")
public class EnseignantController {

	private final EnseignantService enseignantService;
	
	@GetMapping
	public ResponseEntity<?> all(SearchRequest request)
	{
		return ResponseEntity.ok(enseignantService.all(request));
	}
	@GetMapping("/count")
	public ResponseEntity<?> count()
	{
		return ResponseEntity.ok(enseignantService.count());
	}
	@GetMapping("/all")
	public ResponseEntity<?> all()
	{
		return ResponseEntity.ok(enseignantService.allWithoutPAgination());
	}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(enseignantService.remove(id));
    }
    @PutMapping
    public ResponseEntity<?> edit(@RequestBody  EnseignantDto enseignantDto) {
        return ResponseEntity.ok(enseignantService.edit(enseignantDto));
    }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody EnseignantDto enseignantDto) {
        return ResponseEntity.ok(enseignantService.add(enseignantDto));
    }
}