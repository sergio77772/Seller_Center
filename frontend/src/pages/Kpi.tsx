import { useEffect, useState } from 'react';
import { getKpi } from '../services/clienteService';
import type { KpiData } from '../types';
import styles from './Kpi.module.css';

function Kpi() {
    const [kpi, setKpi] = useState<KpiData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getKpi()
            .then(setKpi)
            .catch(() => setError('Error al cargar los KPIs'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p className={styles.loading}>Cargando...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Estadísticas de Clientes</h2>
            <div className={styles.card}>
                <p className={styles.stat}>Promedio de edad: <span className={styles.statValue}>{kpi?.promedioEdad.toFixed(2)} años</span></p>
                <p className={styles.stat}>Desviación estándar: <span className={styles.statValue}>{kpi?.desviacionEstandar.toFixed(2)}</span></p>
            </div>
        </div>
    );
}

export default Kpi;
