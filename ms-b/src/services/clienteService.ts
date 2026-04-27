import axios from 'axios';

const MS_A_URL = process.env.MS_A_URL || 'http://localhost:8080';

const msAClient = axios.create({
    baseURL: MS_A_URL,
    timeout: 5000,
});

export const createClientService = async (body: unknown) => {
    const response = await msAClient.post('/api/clientes', body);
    return response.data;
};

export const getKpiService = async () => {
    const response = await msAClient.get('/api/clientes/kpi');
    return response.data;
};

export const listClientsService = async () => {
    const response = await msAClient.get('/api/clientes');
    return response.data;
};

