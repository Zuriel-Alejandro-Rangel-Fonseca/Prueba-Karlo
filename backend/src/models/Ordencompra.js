import Sequelize from 'sequelize';
import { sequelize } from '../database/database.js';

//import usuariocompra from './Usuariocompra.js';

const ordencompra = sequelize.define('ordencompra', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    usuario: {
        type: Sequelize.TEXT
    },
    productos: {
        type: Sequelize.TEXT
    },
    precio: {
        type: Sequelize.FLOAT
    },
    estatus: {
        type: Sequelize.TEXT
    }
}, {
    timestamps: false
});

/*
ordencompra.hasMany(usuariocompra, {foreingKey: 'id_producto', sourceKey: 'productos'});
ordencompra.belomgsTo(usuariocompra, {foreingKey: 'id_usuario', sourceKey: 'usuario'});


usuariocompra.hasMany(ordencompra, {foreingKey: 'id_producto', sourceKey: 'productos'});
usuariocompra.belomgsTo(ordencompra, {foreingKey: 'id_usuario', sourceKey: 'usuario'});
*/
export default ordencompra;