import { Request, Response } from 'express';
import { createClientService, getKpiService, listClientsService } from '../services/clienteService';

export const createClient = async (req: Request, res: Response): Promise<void> => {
    console.log('[BFF] POST /bff/clientes - body:', req.body);
    try {
        const data = await createClientService(req.body);
        console.log('[BFF] Cliente creado exitosamente');
        res.status(201).json(data);
    } catch (error: any) {
        console.error('[BFF] Error al crear cliente:', error.message);
        const status = error.response?.status || 500;
        const mensaje = error.response?.data || { mensaje: 'Error interno del BFF' };
        res.status(status).json(mensaje);
    }
};

export const getKpi = async (req: Request, res: Response): Promise<void> => {
    console.log('[BFF] GET /bff/clientes/kpi');
    try {
        const data = await getKpiService();
        res.status(200).json(data);
    } catch (error: any) {
        console.error('[BFF] Error al obtener KPI:', error.message);
        const status = error.response?.status || 500;
        const mensaje = error.response?.data || { mensaje: 'Error interno del BFF' };
        res.status(status).json(mensaje);
    }
};

export const listClients = async (req: Request, res: Response): Promise<void> => {
    console.log('[BFF] GET /bff/clientes');
    try {
        const data = await listClientsService();
        res.status(200).json(data);
    } catch (error: any) {
        console.error('[BFF] Error al listar clientes:', error.message);
        const status = error.response?.status || 500;
        const mensaje = error.response?.data || { mensaje: 'Error interno del BFF' };
        res.status(status).json(mensaje);
    }
};
