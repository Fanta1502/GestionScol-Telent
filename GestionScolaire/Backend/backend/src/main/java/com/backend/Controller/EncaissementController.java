package com.backend.Controller;

import java.time.LocalDate;

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

import com.backend.persistence.dto.EncaissementDto;
import com.backend.service.EncaissementService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/encaissement")
public class EncaissementController {
private final EncaissementService encaissementService;

	@GetMapping()
	public ResponseEntity<?> all()
	{
		return ResponseEntity.ok(encaissementService.all());
	}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(encaissementService.remove(id));
    }
	@GetMapping("find/{libelle}/{date}")
	public ResponseEntity<?> find(@PathVariable String libelle, @PathVariable String date)
	{
		return ResponseEntity.ok(encaissementService.find(libelle, LocalDate.parse(date)));
	}
    @PutMapping
    public ResponseEntity<?> edit(@RequestBody EncaissementDto encaissementDto) {
        return ResponseEntity.ok(encaissementService.edit(encaissementDto));
    }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody EncaissementDto encaissementDto) {
        return ResponseEntity.ok(encaissementService.add(encaissementDto));
    }
}