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
import com.backend.persistence.dto.EleveDto;
import com.backend.service.EleveService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/eleve")
public class EleveController {
	private final EleveService eleveService;
	
	@GetMapping
	public ResponseEntity<?> all(SearchRequest request)
	{
		return ResponseEntity.ok(eleveService.all(request));
	}
	@GetMapping("/count")
	public ResponseEntity<?> count()
	{
		return ResponseEntity.ok(eleveService.count());
	}
	@GetMapping("/all_by_classe/{id}")
	public ResponseEntity<?> allByClasse(@PathVariable Long id,SearchRequest request)
	{
		return ResponseEntity.ok(eleveService.findByClasse(request,id));
	}
	@GetMapping("/all_by_classe_1/{id}")
	public ResponseEntity<?> allByClasse(@PathVariable Long id)
	{
		return ResponseEntity.ok(eleveService.findByClasse(id));
	}
	
	@GetMapping("/all") 
	public ResponseEntity<?> all()
	{
		return ResponseEntity.ok(eleveService.allWhithoutPagination());
	}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(eleveService.remove(id));
    }
    @PutMapping
    public ResponseEntity<?> edit(@RequestBody EleveDto eleveDto) {
        return ResponseEntity.ok(eleveService.edit(eleveDto));
    }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody EleveDto eleveDto) {
        return ResponseEntity.ok(eleveService.add(eleveDto));
    }
}
