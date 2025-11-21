package com.gapsi.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.gapsi.dto.ProveedorInput;
import com.gapsi.dto.ProveedorPage;
import com.gapsi.model.Proveedor;
import com.gapsi.service.ProveedorService;

@Controller
public class ProveedorGraphQL {

    private final ProveedorService service;

    public ProveedorGraphQL(ProveedorService service) {
        this.service = service;
    }

    @QueryMapping
    public ProveedorPage proveedores(@Argument int page, @Argument int size) {

    	Page<Proveedor> resultPage = service.listar(page, size);
    	
        return new ProveedorPage(
                resultPage.getContent(),
                resultPage.getTotalElements(),
                resultPage.getTotalPages(),
                resultPage.getNumber(),
                resultPage.getSize()

        );
    }

    @MutationMapping
    public Proveedor agregarProveedor(@Argument ProveedorInput input) {
        return service.crear(input);
    }

    @MutationMapping
    public Boolean eliminarProveedor(@Argument Long id) {

    	try {
    		service.eliminar(id);
		} catch (Exception e) {
			//logeo que no se encontro
			e.printStackTrace();
			return false;
		}
        return true;
    }
}
