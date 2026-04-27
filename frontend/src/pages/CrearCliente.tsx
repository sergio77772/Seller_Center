import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../services/clienteService';
import { validateClienteForm } from '../utils/clienteValidations';
import type { ClienteForm } from '../utils/clienteValidations';
import styles from './CrearCliente.module.css';

function CrearCliente() {
    const navigate = useNavigate();
    const [form, setForm] = useState<ClienteForm>({ nombre: '', apellido: '', edad: '', fechaNacimiento: '' });
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<{ tipo: 'exito' | 'error'; texto: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const error = validateClienteForm(form);
        if (error) { setMensaje({ tipo: 'error', texto: error }); return; }
        setLoading(true);
        setMensaje(null);
        try {
            await createClient({ nombre: form.nombre, apellido: form.apellido, edad: parseInt(form.edad), fechaNacimiento: form.fechaNacimiento });
            setMensaje({ tipo: 'exito', texto: 'Cliente creado exitosamente' });
            setForm({ nombre: '', apellido: '', edad: '', fechaNacimiento: '' });
            setTimeout(() => navigate('/clientes'), 1500);
        } catch (error: any) {
            setMensaje({ tipo: 'error', texto: error.response?.data?.mensaje || 'Error al crear el cliente' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Crear Cliente</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.fieldGroup}>
                    <label htmlFor="nombre" className={styles.label}>Nombre</label>
                    <input id="nombre" name="nombre" className={styles.input} value={form.nombre} onChange={handleChange} />
                </div>
                <div className={styles.fieldGroup}>
                    <label htmlFor="apellido" className={styles.label}>Apellido</label>
                    <input id="apellido" name="apellido" className={styles.input} value={form.apellido} onChange={handleChange} />
                </div>
                <div className={styles.fieldGroup}>
                    <label htmlFor="edad" className={styles.label}>Edad</label>
                    <input id="edad" name="edad" type="number" min={0} max={150} className={styles.input} value={form.edad} onChange={handleChange} />
                </div>
                <div className={styles.fieldGroup}>
                    <label htmlFor="fechaNacimiento" className={styles.label}>Fecha de Nacimiento</label>
                    <input id="fechaNacimiento" name="fechaNacimiento" type="date" className={styles.input} value={form.fechaNacimiento} onChange={handleChange} />
                </div>
                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? 'Guardando...' : 'Crear Cliente'}
                </button>
            </form>
            {mensaje && <p className={mensaje.tipo === 'exito' ? styles.messageSuccess : styles.messageError}>{mensaje.texto}</p>}
        </div>
    );
}

export default CrearCliente;
