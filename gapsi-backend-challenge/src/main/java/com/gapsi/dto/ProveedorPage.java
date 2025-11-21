package com.gapsi.dto;
import java.util.List;

import com.gapsi.model.Proveedor;

public record ProveedorPage(
        List<Proveedor> content,
        long totalElements,
        int totalPages,
        int pageNumber,
        int pageSize
) {

	public List<Proveedor> content() {
		return content;
	}

	public long totalElements() {
		return totalElements;
	}

	public int totalPages() {
		return totalPages;
	}

	public int pageNumber() {
		return pageNumber;
	}

	public int pageSize() {
		return pageSize;
	}
	
}
