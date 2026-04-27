package com.sellerCenter.ms_a.service;

import com.sellerCenter.ms_a.dto.ClienteRequestDTO;
import com.sellerCenter.ms_a.dto.ClienteResponseDTO;
import com.sellerCenter.ms_a.dto.KpiResponseDTO;
import com.sellerCenter.ms_a.model.Cliente;
import com.sellerCenter.ms_a.repository.ClienteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;

    @Override
    public ClienteResponseDTO create(ClienteRequestDTO dto) {
        log.info("Creando cliente: {} {}", dto.getNombre(), dto.getApellido());
        Cliente cliente = new Cliente();
        cliente.setNombre(dto.getNombre());
        cliente.setApellido(dto.getApellido());
        cliente.setEdad(dto.getEdad());
        cliente.setFechaNacimiento(dto.getFechaNacimiento());

        Cliente guardado = clienteRepository.save(cliente);
        log.info("Cliente creado con id: {}", guardado.getId());
        return toResponse(guardado);
    }

    @Override
    public KpiResponseDTO getKpi() {
        log.info("Calculando KPI de clientes");
        List<Cliente> clientes = clienteRepository.findAll();

        double promedio = clientes.stream()
                .mapToInt(Cliente::getEdad)
                .average()
                .orElse(0.0);

        double desviacion = Math.sqrt(clientes.stream()
                .mapToDouble(c -> Math.pow(c.getEdad() - promedio, 2))
                .average()
                .orElse(0.0));

        log.info("KPI calculado - promedio: {}, desviacion: {}", promedio, desviacion);

        KpiResponseDTO kpi = new KpiResponseDTO();
        kpi.setPromedioEdad(promedio);
        kpi.setDesviacionEstandar(desviacion);
        return kpi;
    }

    @Override
    public List<ClienteResponseDTO> listAll() {
        log.info("Listando todos los clientes");
        List<ClienteResponseDTO> clientes = clienteRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
        log.info("Se encontraron {} clientes", clientes.size());
        return clientes;
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
