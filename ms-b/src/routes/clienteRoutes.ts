import { Router } from 'express';
import { createClient, getKpi, listClients } from '../controllers/clienteController';

const router = Router();

router.post('/clientes', createClient);
router.get('/clientes/kpi', getKpi);
router.get('/clientes', listClients);

export default router;
