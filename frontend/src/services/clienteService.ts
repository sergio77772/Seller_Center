import axios from 'axios';

const BFF_URL = import.meta.env.VITE_BFF_URL || 'http://localhost:3001';

export const createClient = async (data: {
    nombre: string;
    apellido: string;
    edad: number;
    fechaNacimiento: string;
}) => {
    const response = await axios.post(`${BFF_URL}/bff/clientes`, data);
    return response.data;
};

export const getKpi = async () => {
    const response = await axios.get(`${BFF_URL}/bff/clientes/kpi`);
    return response.data;
};

export const listClients = async () => {
    const response = await axios.get(`${BFF_URL}/bff/clientes`);
    return response.data;
};
