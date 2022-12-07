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
import com.backend.persistence.dto.ClasseDto;
import com.backend.service.ClasseService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/classe")
public class ClasseController {
	private final ClasseService classeService;
	
	@GetMapping
	public ResponseEntity<?> all(SearchRequest request)
	{
		return ResponseEntity.ok(classeService.all(request));
	}
	@GetMapping("/all")
	public ResponseEntity<?> all()
	{
		return ResponseEntity.ok(classeService.allWhithoutPagination());
	}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id) {
        return ResponseEntity.ok(classeService.remove(id));
    }
    @PutMapping
    public ResponseEntity<?> edit(@RequestBody ClasseDto classeDto) {
        return ResponseEntity.ok(classeService.edit(classeDto));
    }
    @PostMapping
    public ResponseEntity<?> add(@RequestBody ClasseDto classeDto) {
        return ResponseEntity.ok(classeService.add(classeDto));
    }
}