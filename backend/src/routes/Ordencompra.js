import { Router } from 'express';
const router = Router();

import { crearOrden, obtenerOrden, eliminarOrden, actualizarOrden } from '../controllers/Ordencompra.controller.js';
import { obtenerProductos } from '../controllers/Productos.controller.js';
import { obtenerUsuarios } from '../controllers/Usuario.controller.js';

// /api/Ordencompra/
router.post('/orden', crearOrden);
router.get('/orden', obtenerOrden);

//Mostrar listas para elegir al usuario y al producto
router.get('/orden', obtenerProductos);
router.get('/orden', obtenerUsuarios);


// /api/Ordencompra/:Id
router.delete('/orden/:Id', eliminarOrden);
router.put('/orden/:Id', actualizarOrden);

export default router;