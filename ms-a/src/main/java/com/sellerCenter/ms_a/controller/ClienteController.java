package com.sellerCenter.ms_a.controller;

import com.sellerCenter.ms_a.dto.ClienteRequestDTO;
import com.sellerCenter.ms_a.dto.ClienteResponseDTO;
import com.sellerCenter.ms_a.dto.KpiResponseDTO;
import com.sellerCenter.ms_a.service.ClienteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
@RequiredArgsConstructor
@Tag(name = "Clientes", description = "Gestion de clientes")
public class ClienteController {

    private final ClienteService clienteService;

    @PostMapping
    @Operation(summary = "Crear un nuevo cliente")
    public ResponseEntity<ClienteResponseDTO> create(@Valid @RequestBody ClienteRequestDTO dto) {
        ClienteResponseDTO response = clienteService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/kpi")
    @Operation(summary = "Obtener promedio y desviacion estandar de edades")
    public ResponseEntity<KpiResponseDTO> getKpi() {
        return ResponseEntity.ok(clienteService.getKpi());
    }

    @GetMapping
    @Operation(summary = "Listar todos los clientes con fecha probable de fallecimiento")
    public ResponseEntity<List<ClienteResponseDTO>> listAll() {
        return ResponseEntity.ok(clienteService.listAll());
    }
}
