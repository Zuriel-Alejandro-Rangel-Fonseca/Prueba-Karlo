import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const usuario = sequelize.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    correo: {
        type: Sequelize.TEXT
    },
    contrasena: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
});



export default usuario;