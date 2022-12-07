package com.backend.payload.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchRequest {
		private int size;
		private int page;
}

