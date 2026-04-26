import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const MS_A_URL = process.env.MS_A_URL || 'http://localhost:8080';

export const createClientService = async (body: unknown) => {
    const response = await axios.post(`${MS_A_URL}/api/clientes`, body);
    return response.data;
};

export const getKpiService = async () => {
    const response = await axios.get(`${MS_A_URL}/api/clientes/kpi`);
    return response.data;
};

export const listClientsService = async () => {
    const response = await axios.get(`${MS_A_URL}/api/clientes`);
    return response.data;
};
