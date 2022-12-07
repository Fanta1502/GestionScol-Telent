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
import com.backend.persistence.dto.PersonnelDto;
import com.backend.service.PersonnelService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api/personnel")
public class PersonnelController {
	private final PersonnelService personnelService;

	@GetMapping
	public ResponseEntity<?> all(SearchRequest request) {
		return ResponseEntity.ok(personnelService.all(request));
	}

	@GetMapping("/count")
	public ResponseEntity<?> count() {
		return ResponseEntity.ok(personnelService.count());
	}

	@GetMapping("/all")
	public ResponseEntity<?> all() {
		return ResponseEntity.ok(personnelService.allWhithoutPagination());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> remove(@PathVariable Long id) {
		return ResponseEntity.ok(personnelService.remove(id));
	}

	@PutMapping
	public ResponseEntity<?> edit(@RequestBody PersonnelDto personnelDto) {
		return ResponseEntity.ok(personnelService.edit(personnelDto));
	}

	@PostMapping
	public ResponseEntity<?> add(@RequestBody PersonnelDto personnelDto) {
		return ResponseEntity.ok(personnelService.add(personnelDto));
	}
}
