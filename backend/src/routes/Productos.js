import { Router } from 'express';
const router = Router();

import { crearProducto, eliminarProducto, obtenerProductos, obtenerUnProducto, actualizarProducto } from '../controllers/Productos.controller.js';

// /api/Productos/
router.post('/productos', crearProducto);
router.get('/productos', obtenerProductos);

// /api/Usuario/:Id
router.get('/productos/:Id', obtenerUnProducto);
router.delete('/productos/:Id', eliminarProducto);
router.put('/productos/:Id', actualizarProducto);


export default router;