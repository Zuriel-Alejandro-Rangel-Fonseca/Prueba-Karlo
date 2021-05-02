import Productos from '../models/Productos.js';
import ordencompra from '../models/Ordencompra.js';

//Crear un producto
export async function crearProducto(req, res){
    const { nombre, cantidad, precio } = req.body;
    console.log(req.body);
    try {
        let nuevoProducto = await Productos.create({
            nombre: nombre, 
            precio: precio,
            cantidad: cantidad,
        }, {
            fields: ['nombre', 'cantidad', 'precio']
        });
    
        if(nuevoProducto){
            return res.json({
                message: 'Nuevo producto creado',
                data: nuevoProducto
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
    
}

//obtener todos los productos
export async function obtenerProductos(req, res){
    try {
        const producto = await Productos.findAll();
        res.json({
            data: producto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

//Obtener un producto
export async function obtenerUnProducto(req, res){
    try {
        const { Id } = req.params;
        const producto = await Productos.findOne({
            where: {
                id: Id
            }
        });
        res.json({
            data: producto
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

//Eliminar un producto y ordenes con el producto asociado
export async function eliminarProducto(req, res){
    try {
        const { Id } = req.params;
        const esEliminado = await eliminarOrden(Id);
        if (esEliminado) {
            
        }
        const deleteRowCount = await Productos.destroy({
            where: {
                id: Id
            }
        });
        res.json({
            message: 'El producto se elimino, además de las ordenes asociadas al producto',
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

async function eliminarOrden(Id){
    let eliminado = false;

    try {
        const productoOrden = await ordencompra.findAll({
            where: {
                productos: Id
            }
        });
        if (productoOrden.length>0) {
            const deleteRowCount = await ordencompra.destroy({
                where: {
                    productos: Id
                }
            });
            eliminado = deleteRowCount === 1 ? true : false;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

//Actualizar productos
export async function actualizarProducto(req, res){
    try {
        const { Id } = req.params;
        const { nombre, cantidad, precio } = req.body;
        const productos = await Productos.findAll({
            attributes: ['id', 'nombre', 'cantidad', 'precio'],
            where: {
                id: Id
            }
        });

        if (productos.length > 0) {
            productos.forEach(async productos => {
                await productos.update({
                    nombre: nombre,
                    cantidad: cantidad,
                    precio: precio
                });
            });
        }

        return res.json({
            message: 'Producto actualizado',
            data: productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}