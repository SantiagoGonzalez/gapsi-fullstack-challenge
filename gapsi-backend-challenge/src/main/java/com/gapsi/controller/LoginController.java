package com.gapsi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gapsi.model.Candidato;
import com.gapsi.service.CandidatoService;

@RestController
@RequestMapping("/api")
public class LoginController {

    @Autowired
    private CandidatoService candidatoService;

    @GetMapping("/login/candidato/{id}")
    public ResponseEntity<Candidato> getCandidatoById(@PathVariable Long id) {
        return candidatoService.getCandidatoById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

//    TODO: crear Service REST que lo traiga, o sacarlo del POM
    @GetMapping("/login/appversion")
    public ResponseEntity<String> getAppVersion() {
        return ResponseEntity.ok("0.0.1");
    }

}
