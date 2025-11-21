package com.gapsi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gapsi.model.Candidato;
import com.gapsi.repository.CandidatoRepository;

//PATRON DISEÑO REPOSITORY
@Service
public class CandidatoService {

    @Autowired
    private CandidatoRepository candidatoRepository;

    public List<Candidato> getAllUsers() {
        return candidatoRepository.findAll();
    }

    public Optional<Candidato> getCandidatoById(Long id) {
        return candidatoRepository.findById(id);
    }

}


