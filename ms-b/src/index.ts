import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import clienteRoutes from './routes/clienteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/bff', clienteRoutes);

app.listen(PORT, () => {
    console.log(`BFF corriendo en puerto ${PORT}`);
});

export default app;
