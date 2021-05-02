/*import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

import usuario from './Usuario.js';
import productos from './Productos.js';

const usuariocompra = sequelize.define('usuariocompra', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    id_producto: {
        type: Sequelize.INTEGER
    },
    id_usuario: {
        type: Sequelize.INTEGER
    }
}, {
    timestamps: false
});

usuariocompra.hasMany(usuario, { foreinKey: 'id', sourceKey: 'id_usuario'});
usuariocompra.hasMany(productos, { foreinKey: 'id', sourceKey: 'id_producto'});

usuario.hasMany(usuariocompra, { foreinKey: 'id', sourceKey: 'id_usuario'});
productos.hasMany(usuariocompra, { foreinKey: 'id', sourceKey: 'id_producto'});

export default usuariocompra;*/