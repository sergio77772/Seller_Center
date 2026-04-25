package com.sellerCenter.ms_a.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ClienteResponseDTO {

    private Long id;
    private String nombre;
    private String apellido;
    private Integer edad;
    private LocalDate fechaNacimiento;
    private LocalDate fechaProbableFallecimiento;
}