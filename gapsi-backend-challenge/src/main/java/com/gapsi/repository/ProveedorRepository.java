package com.gapsi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gapsi.model.Proveedor;

//PATRON DISEÑO REPOSITORY
@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Long> {
    Optional<Proveedor> findByNombre(String nombre);
    boolean existsByNombre(String name); //nombre unique no se puede repetir
    Optional<Proveedor> findByNombreIgnoreCase(String nombre);

}


