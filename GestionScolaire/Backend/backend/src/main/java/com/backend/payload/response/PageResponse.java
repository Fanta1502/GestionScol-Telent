package com.backend.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PageResponse<DTO> {
	private List<DTO> content;
	private long count;
	private long totalCount;
}
