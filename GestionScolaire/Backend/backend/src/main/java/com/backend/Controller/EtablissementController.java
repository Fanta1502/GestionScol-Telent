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
import com.backend.persistence.dto.EtablissementDto;
import com.backend.service.EtablissementService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/etablissement")
public class EtablissementController {
	private final EtablissementService etablissementService;
	@GetMapping
	public ResponseEntity<?> all(SearchRequest request)
	{
		return ResponseEntity.ok(etablissementService.all(request));
	}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(etablissementService.remove(id));
    }
    @PutMapping
    public ResponseEntity<?> edit(@RequestBody EtablissementDto etablissementDto) {
        return ResponseEntity.ok(etablissementService.edit(etablissementDto));
    }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody EtablissementDto etablissementDto) {
        return ResponseEntity.ok(etablissementService.add(etablissementDto));
    }
}
