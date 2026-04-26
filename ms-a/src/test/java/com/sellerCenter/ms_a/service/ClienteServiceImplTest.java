package com.sellerCenter.ms_a.service;

import com.sellerCenter.ms_a.dto.ClienteRequestDTO;
import com.sellerCenter.ms_a.dto.ClienteResponseDTO;
import com.sellerCenter.ms_a.dto.KpiResponseDTO;
import com.sellerCenter.ms_a.model.Cliente;
import com.sellerCenter.ms_a.repository.ClienteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ClienteServiceImplTest {

    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private ClienteServiceImpl clienteService;

    private Cliente cliente1;
    private Cliente cliente2;

    @BeforeEach
    void setUp() {
        cliente1 = new Cliente(1L, "Juan", "Perez", 30, LocalDate.of(1994, 1, 1));
        cliente2 = new Cliente(2L, "Ana", "Lopez", 50, LocalDate.of(1974, 1, 1));
    }

    @Test
    void create_shouldReturnCreatedClient() {
        ClienteRequestDTO dto = new ClienteRequestDTO();
        dto.setNombre("Juan");
        dto.setApellido("Perez");
        dto.setEdad(30);
        dto.setFechaNacimiento(LocalDate.of(1994, 1, 1));

        when(clienteRepository.save(any(Cliente.class))).thenReturn(cliente1);

        ClienteResponseDTO response = clienteService.create(dto);

        assertNotNull(response);
        assertEquals("Juan", response.getNombre());
        assertEquals("Perez", response.getApellido());
        assertEquals(30, response.getEdad());
        assertNotNull(response.getFechaProbableFallecimiento());
        verify(clienteRepository, times(1)).save(any(Cliente.class));
    }

    @Test
    void getKpi_shouldCalculateAverageAndStdDev() {
        when(clienteRepository.findAll()).thenReturn(List.of(cliente1, cliente2));

        KpiResponseDTO kpi = clienteService.getKpi();

        assertNotNull(kpi);
        assertEquals(40.0, kpi.getPromedioEdad());
        assertTrue(kpi.getDesviacionEstandar() > 0);
    }

    @Test
    void listAll_shouldReturnClientsWithDeathDate() {
        when(clienteRepository.findAll()).thenReturn(List.of(cliente1, cliente2));

        List<ClienteResponseDTO> lista = clienteService.listAll();

        assertEquals(2, lista.size());
        assertEquals(LocalDate.of(2074, 1, 1), lista.get(0).getFechaProbableFallecimiento());
        assertEquals(LocalDate.of(2054, 1, 1), lista.get(1).getFechaProbableFallecimiento());
    }
}
