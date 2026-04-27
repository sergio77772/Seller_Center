import axios from 'axios';
import { createClientService, getKpiService, listClientsService } from '../src/services/clienteService';

jest.mock('axios', () => ({
    create: jest.fn(() => ({
        post: jest.fn(),
        get: jest.fn(),
    })),
    isAxiosError: jest.fn(),
}));

describe('clienteService', () => {
    let mockInstance: { post: jest.Mock; get: jest.Mock };

    beforeAll(() => {
        // axios.create() is called once when the service module loads
        mockInstance = (axios.create as jest.Mock).mock.results[0].value;
    });

    beforeEach(() => {
        mockInstance.post.mockReset();
        mockInstance.get.mockReset();
    });

    it('createClientService should call the correct endpoint and return data', async () => {
        const mockData = { id: 1, nombre: 'Juan', apellido: 'Perez', edad: 30 };
        mockInstance.post.mockResolvedValue({ data: mockData });

        const result = await createClientService({ nombre: 'Juan', apellido: 'Perez', edad: 30 });

        expect(mockInstance.post).toHaveBeenCalledWith('/api/clientes', expect.any(Object));
        expect(result).toEqual(mockData);
    });

    it('getKpiService should call the correct endpoint and return data', async () => {
        const mockKpi = { promedioEdad: 40.0, desviacionEstandar: 10.0 };
        mockInstance.get.mockResolvedValue({ data: mockKpi });

        const result = await getKpiService();

        expect(mockInstance.get).toHaveBeenCalledWith('/api/clientes/kpi');
        expect(result).toEqual(mockKpi);
    });

    it('listClientsService should call the correct endpoint and return list', async () => {
        const mockLista = [{ id: 1, nombre: 'Juan' }];
        mockInstance.get.mockResolvedValue({ data: mockLista });

        const result = await listClientsService();

        expect(mockInstance.get).toHaveBeenCalledWith('/api/clientes');
        expect(result).toEqual(mockLista);
    });
});

