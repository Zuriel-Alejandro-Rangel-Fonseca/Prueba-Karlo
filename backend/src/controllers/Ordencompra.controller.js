import ordencompra from '../models/Ordencompra.js';

//Crear orden
export async function crearOrden(req, res){
    const { usuario, productos, precio, estatus } = req.body;
    console.log(req.body);
    try {
        let nuevaOrden = await ordencompra.create({
            usuario: usuario, 
            productos: productos,
            precio: precio,
            estatus: estatus
        }, {
            fields: ['usuario', 'productos', 'precio', 'estatus']
        });
    
        if(nuevaOrden){
            return res.json({
                message: 'Nueva orden hecha',
                data: nuevaOrden
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

//Obtener orden
export async function obtenerOrden(req, res){
    try {
        const ordenC = await ordencompra.findAll();
        res.json({
            data: ordenC
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}

//Eliminar orden
export async function eliminarOrden(req, res){
    try {
        const { Id } = req.params;
        const deleteRowCount = await ordencompra.destroy({
            where: {
                id: Id
            }
        });
        res.json({
            message: 'La orden ha sido eliminada',
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

//Actualizar producto, el status pasa de EN PROCESO a PAGADO
export async function actualizarOrden(req, res){
    try {
        const { Id } = req.params;
        //const { estatus };
        const ordenC = await ordencompra.findAll({
            attributes: ['id', 'estatus'],
            where: {
                id: Id
            }
        });

        if (ordenC.length > 0) {
            ordenC.forEach(async ordenC => {
                await ordenC.update({
                    estatus: "PAGADO"
                });
            });
        }

        return res.json({
            message: 'Producto actualizado',
            data: ordenC
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Algo salio mal',
            data: {}
        });
    }
}