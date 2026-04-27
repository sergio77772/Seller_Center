import { useEffect, useState } from 'react';
import { listClients } from '../services/clienteService';
import type { Cliente } from '../types';
import styles from './ListaClientes.module.css';

function ListaClientes() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        listClients()
            .then(setClientes)
            .catch(() => setError('Error al cargar los clientes'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className={styles.loading}>Cargando...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Lista de Clientes</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Fecha Probable de Fallecimiento</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(c => (
                        <tr key={c.id}>
                            <td>{c.nombre}</td>
                            <td>{c.apellido}</td>
                            <td>{c.edad}</td>
                            <td>{c.fechaNacimiento}</td>
                            <td>{c.fechaProbableFallecimiento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {clientes.length === 0 && <p className={styles.empty}>No hay clientes registrados.</p>}
        </div>
    );
}

export default ListaClientes;
