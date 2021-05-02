import Sequelize from 'sequelize';

export const sequelize = new Sequelize(
    'tiendakarlo',
    'postgres',
    '12y3Tamarind@',
    {
        host: 'localhost',
        dialect: 'postgres',
        pool:{ //Referente a las conexiones
            max: 5,
            min: 0,
            require: 30000,
            idle: 10000
        },
        logging: false //Como esta morgan instalado ya no hace falta que retorne mensajes a la consola
    }
)