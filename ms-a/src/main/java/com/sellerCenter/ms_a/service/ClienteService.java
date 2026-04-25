package com.sellerCenter.ms_a.service;

import com.sellerCenter.ms_a.dto.ClienteRequestDTO;
import com.sellerCenter.ms_a.dto.ClienteResponseDTO;
import com.sellerCenter.ms_a.dto.KpiResponseDTO;

import java.util.List;

public interface ClienteService {

    ClienteResponseDTO crear(ClienteRequestDTO dto);
    KpiResponseDTO obtenerKpi();
    List<ClienteResponseDTO> listarTodos();
}