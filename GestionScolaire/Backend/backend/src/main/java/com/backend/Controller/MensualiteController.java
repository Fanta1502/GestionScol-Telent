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
import com.backend.persistence.dto.MensualiteDto;
import com.backend.service.MensualiteService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/mensualite")
public class MensualiteController {
private final MensualiteService mensualiteService;
	
	@GetMapping("/{id}")
	public ResponseEntity<?> allByClasse(@PathVariable Long id,SearchRequest request)
	{
		return ResponseEntity.ok(mensualiteService.findByEleve(request,id));
	}
	
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(mensualiteService.remove(id));
    }
    @PutMapping
    public ResponseEntity<?> edit(@RequestBody MensualiteDto mensualiteDto) {
        return ResponseEntity.ok(mensualiteService.edit(mensualiteDto));
    }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody MensualiteDto mensualiteDto) {
        return ResponseEntity.ok(mensualiteService.add(mensualiteDto));
    }
}
