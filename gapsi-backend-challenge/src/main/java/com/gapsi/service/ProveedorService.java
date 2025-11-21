package com.gapsi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.gapsi.dto.ProveedorInput;
import com.gapsi.exceptions.ProveedorExistenteException;
import com.gapsi.model.Proveedor;
import com.gapsi.repository.ProveedorRepository;

@Service
//@Transactional
public class ProveedorService {

    @Autowired
    private  ProveedorRepository repo;


    public Page<Proveedor> listar(int page, int size) {
        return repo.findAll(PageRequest.of(page, size));
    }

    public Proveedor crear(ProveedorInput input) {
    	//si ya existe devuelvo error
        repo.findByNombreIgnoreCase(input.nombre()).ifPresent(p -> {
            throw new ProveedorExistenteException("El proveedor '" + input.nombre() + "' ya existe.");
        });

        //creo el nuevo
        Proveedor p = new Proveedor(
                input.nombre(),
                input.razonSocial(),
                input.direccion()
        );

        return repo.save(p);
    }

    public void eliminar(Long id) {

        if (!repo.existsById(id)) {
            throw new RuntimeException("Proveedor no encontrado");
        }
        repo.deleteById(id);
    }
}
