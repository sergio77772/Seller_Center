export interface Cliente {
    id: number;
    nombre: string;
    apellido: string;
    edad: number;
    fechaNacimiento: string;
    fechaProbableFallecimiento: string;
}

export interface KpiData {
    promedioEdad: number;
    desviacionEstandar: number;
}
