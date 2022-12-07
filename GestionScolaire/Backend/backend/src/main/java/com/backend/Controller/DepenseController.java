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

import com.backend.payload.request.SearchRequest;
import com.backend.persistence.dto.DepenseDto;
import com.backend.service.DepenseService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/depense")
public class DepenseController {
private final DepenseService depenseService;
	
	@GetMapping
	public ResponseEntity<?> all(SearchRequest request)
	{
		return ResponseEntity.ok(depenseService.all(request));
	}
	@GetMapping("/allWithOutPagination")
	public ResponseEntity<?> allWithOutPagination()
	{
		return ResponseEntity.ok(depenseService.allWithoutPagination());
	}
	@GetMapping("find/{libelle}/{date}")
	public ResponseEntity<?> find(@PathVariable String libelle, @PathVariable String date)
	{
		return ResponseEntity.ok(depenseService.find(libelle, LocalDate.parse(date)));
	}
	@GetMapping("/all")
	public ResponseEntity<?> all()
	{
		return ResponseEntity.ok(depenseService.all());
	}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(depenseService.remove(id));
    }
    @PutMapping 
    public ResponseEntity<?> edit(@RequestBody DepenseDto depenseDto) {
        return ResponseEntity.ok(depenseService.edit(depenseDto));
    }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody DepenseDto depenseDto) {
        return ResponseEntity.ok(depenseService.add(depenseDto));
    }
}