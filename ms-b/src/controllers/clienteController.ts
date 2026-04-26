import { Request, Response } from 'express';
import { createClientService, getKpiService, listClientsService } from '../services/clienteService';

export const createClient = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await createClientService(req.body);
        res.status(201).json(data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const mensaje = error.response?.data || { mensaje: 'Error interno del BFF' };
        res.status(status).json(mensaje);
    }
};

export const getKpi = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await getKpiService();
        res.status(200).json(data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const mensaje = error.response?.data || { mensaje: 'Error interno del BFF' };
        res.status(status).json(mensaje);
    }
};

export const listClients = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await listClientsService();
        res.status(200).json(data);
    } catch (error: any) {
        const status = error.response?.status || 500;
        const mensaje = error.response?.data || { mensaje: 'Error interno del BFF' };
        res.status(status).json(mensaje);
    }
};
