import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import CrearCliente from './pages/CrearCliente';
import Kpi from './pages/Kpi';
import ListaClientes from './pages/ListaClientes';
import styles from './App.module.css';

function App() {
    return (
        <BrowserRouter>
            <nav className={styles.nav}>
                <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}>
                    Crear Cliente
                </NavLink>
                <NavLink to="/kpi" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}>
                    KPI
                </NavLink>
                <NavLink to="/clientes" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}>
                    Lista de Clientes
                </NavLink>
            </nav>
            <div className={styles.content}>
                <Routes>
                    <Route path="/" element={<CrearCliente />} />
                    <Route path="/kpi" element={<Kpi />} />
                    <Route path="/clientes" element={<ListaClientes />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
