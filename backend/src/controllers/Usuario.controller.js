import Usuario from '../models/Usuario.js';
import ordencompra from '../models/Ordencompra.js';

//Consultar todos los usuarios
export async function obtenerUsuarios(req, res){
    try {
        const usuarios = await Usuario.findAll();
        console.log(usuarios);
        res.json({
        message: 'consultado',
        data: usuarios
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
    
};

//Consultar un usuario
export async function obtenerUnUsuario(req, res){
    try {
        const { Id } = req.params;
        const usuario = await Usuario.findOne({
            where: {
                id: Id
            }
        });
        res.json({
            data: usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

//Eliminar usaurio y ordenes asociadas al usaurio
export async function eliminarUsuario(req, res){
    try {
        const { nombre, Id } = req.params;
        const esEliminado = await eliminarOrden(nombre);
        if(esEliminado){
            
        }
        const deleteRowCount = await Usuario.destroy({
            where: {
                id: Id
            }
        });
        res.json({
            message: 'El usaurio se elimino',
            count: deleteRowCount
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

 async function eliminarOrden(Usuario){
     let eliminado = false;
    
    try {
        const ordenUsuario = await ordencompra.findAll({
            where: {
                usuario: Usuario
            }
        });

        if(ordenUsuario.length>0){
            const deleteRowCount = await ordencompra.destroy({
                where: {
                    usuario: Usuario
                }
            });
            eliminado = deleteRowCount === 1 ? true : false;
            
        }
        return eliminado;
    } catch (error) {
        console.log(error);
        return false;
    }
}

//Crear usuario
export async function crearUsuario(req, res){
    const { nombre, correo, contrasena } = req.body;
    console.log(req.body);
    try {
        let nuevoUsuario = await Usuario.create({
            nombre: nombre, 
            correo: correo,
            contrasena: contrasena
        }, {
            fields: ['nombre', 'correo', 'contrasena']
        });
    
        if(nuevoUsuario.get()){
            return res.json({
                message: 'Nuevo usuario creado',
                data: nuevoUsuario
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
    
};

