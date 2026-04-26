package com.sellerCenter.ms_a.service;

import com.sellerCenter.ms_a.dto.ClienteRequestDTO;
import com.sellerCenter.ms_a.dto.ClienteResponseDTO;
import com.sellerCenter.ms_a.dto.KpiResponseDTO;
import com.sellerCenter.ms_a.model.Cliente;
import com.sellerCenter.ms_a.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    @Override
    public ClienteResponseDTO create(ClienteRequestDTO dto) {
        Cliente cliente = new Cliente();
        cliente.setNombre(dto.getNombre());
        cliente.setApellido(dto.getApellido());
        cliente.setEdad(dto.getEdad());
        cliente.setFechaNacimiento(dto.getFechaNacimiento());

        Cliente guardado = clienteRepository.save(cliente);
        return toResponse(guardado);
    }

    @Override
    public KpiResponseDTO getKpi() {
        List<Cliente> clientes = clienteRepository.findAll();

        double promedio = clientes.stream()
                .mapToInt(Cliente::getEdad)
                .average()
                .orElse(0.0);

        double desviacion = Math.sqrt(clientes.stream()
                .mapToDouble(c -> Math.pow(c.getEdad() - promedio, 2))
                .average()
                .orElse(0.0));

        KpiResponseDTO kpi = new KpiResponseDTO();
        kpi.setPromedioEdad(promedio);
        kpi.setDesviacionEstandar(desviacion);
        return kpi;
    }

    @Override
    public List<ClienteResponseDTO> listAll() {
        return clienteRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private ClienteResponseDTO toResponse(Cliente cliente) {
        ClienteResponseDTO response = new ClienteResponseDTO();
        response.setId(cliente.getId());
        response.setNombre(cliente.getNombre());
        response.setApellido(cliente.getApellido());
        response.setEdad(cliente.getEdad());
        response.setFechaNacimiento(cliente.getFechaNacimiento());
        response.setFechaProbableFallecimiento(
                cliente.getFechaNacimiento().plusYears(80));
        return response;
    }
}
