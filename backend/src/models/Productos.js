import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

const productos = sequelize.define('productos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: Sequelize.TEXT
    },
    cantidad: {
        type: Sequelize.INTEGER
    },
    precio: {
        type: Sequelize.FLOAT
    }
}, {
    timestamps: false
});

export default productos;