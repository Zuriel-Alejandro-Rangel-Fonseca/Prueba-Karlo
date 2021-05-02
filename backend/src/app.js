import express, { json } from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';


//importar rutas
import ordencompraRoutes from './routes/Ordencompra.js';
import productosRoutes from './routes/Productos.js';
import usuarioRoutes from './routes/Usuario.js';

const app = express();
app.use(bodyParser.json());

app.use(cors());

//inicializar
app.use('/api', ordencompraRoutes);
app.use('/api', productosRoutes);
app.use('/api', usuarioRoutes);



//Middlewares
app.use(morgan('dev'));
app.use(json());


export default app;