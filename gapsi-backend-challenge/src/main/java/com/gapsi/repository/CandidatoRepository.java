package com.gapsi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gapsi.model.Candidato;

//PATRON DISEÑO REPOSITORY
@Repository
public interface CandidatoRepository extends JpaRepository<Candidato, Long> {
    Optional<Candidato> findByNombre(String nombre);
    boolean existsByNombre(String name);
}


