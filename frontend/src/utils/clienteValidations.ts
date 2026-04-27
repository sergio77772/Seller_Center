export interface ClienteForm {
    nombre: string;
    apellido: string;
    edad: string;
    fechaNacimiento: string;
}

export const validateClienteForm = (form: ClienteForm): string | null => {
    if (!form.nombre || !form.apellido || !form.edad || !form.fechaNacimiento)
        return 'Todos los campos son obligatorios';
    const edad = parseInt(form.edad);
    if (isNaN(edad) || edad < 0 || edad > 150)
        return 'La edad debe ser un número entre 0 y 150';
    if (new Date(form.fechaNacimiento) >= new Date())
        return 'La fecha de nacimiento debe ser en el pasado';
    return null;
};
