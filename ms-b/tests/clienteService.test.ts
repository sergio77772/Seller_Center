import axios from 'axios';
import { createClientService, getKpiService, listClientsService } from '../src/services/clienteService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('clienteService', () => {

    it('createClientService should call the correct endpoint and return data', async () => {
        const mockData = { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 30 };
        mockedAxios.post.mockResolvedValue({ data: mockData });

        const result = await createClientService({ nombre: 'Juan', apellido: 'Perez', edad: 30 });

        expect(mockedAxios.post).toHaveBeenCalledWith(
            expect.stringContaining('/api/clientes'),
            expect.any(Object)
        );
        expect(result).toEqual(mockData);
    });

    it('getKpiService should call the correct endpoint and return data', async () => {
        const mockKpi = { promedioEdad: 40.0, desviacionEstandar: 10.0 };
        mockedAxios.get.mockResolvedValue({ data: mockKpi });

        const result = await getKpiService();

        expect(mockedAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('/api/clientes/kpi')
        );
        expect(result).toEqual(mockKpi);
    });

    it('listClientsService should call the correct endpoint and return list', async () => {
        const mockLista = [{ id: 1, nombre: 'Juan' }];
        mockedAxios.get.mockResolvedValue({ data: mockLista });

        const result = await listClientsService();

        expect(mockedAxios.get).toHaveBeenCalledWith(
            expect.stringContaining('/api/clientes')
        );
        expect(result).toEqual(mockLista);
    });
});
