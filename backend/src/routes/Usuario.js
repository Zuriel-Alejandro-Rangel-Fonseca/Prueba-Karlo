import { Router } from 'express';
const router = Router();

import { crearUsuario, obtenerUsuarios, obtenerUnUsuario, eliminarUsuario } from '../controllers/Usuario.controller.js';

// /api/Usuario/
router.post('/usuario', crearUsuario);
router.get('/usuario', obtenerUsuarios);

// /api/Usaurio/:Id
router.get('/usuario/:Id', obtenerUnUsuario);
router.delete('/usuario/:nombre/:Id', eliminarUsuario);

export default router;