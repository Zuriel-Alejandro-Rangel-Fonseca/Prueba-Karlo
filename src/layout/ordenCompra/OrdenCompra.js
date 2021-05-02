import React, { useState, useEffect } from 'react';
import { guardarOrden, obtenerTodosOrden, borrarOrden, obtenerTodosUsuarios, obtenerTodosProductos, ordenPagar} from '../../components/services/index.js';

const Ordenes = () => {

    const [usuario, setUsuaurio] = useState([]);

    useEffect(() => {
        const api = async () => {
            const result = await obtenerTodosUsuarios();
            setUsuaurio(result.data.data);
        } 
        api();  
        
    }, []);

    const [producto, setProducto] = useState([]);

    useEffect(() => {
        const api = async () => {
            const result = await obtenerTodosProductos();
            setProducto(result.data.data);
        }
        api();
        
    }, []);

    const [orden, setOrden] = useState([]);

    useEffect(() => {
        const api = async () => {
            const result = await obtenerTodosOrden();
            setOrden(result.data.data);
        }
        api();
        
    }, []);

    const handleSubmitBorrar = (event) => {
        borrarOrden(event);
    }


    const [formValues, setFormValues] = useState({
        usuario: '',
        productos: '',
        precio: '',
        iva: '',
        estatus: 'EN PROCESO',
        cantidad: ''
    });

    const cambiarPrecio = (nuevoPrecio) => {
        formValues.precio = nuevoPrecio;

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        guardarOrden({...formValues});
    }

    const handlePagar = (event) => {
        formValues.id = event;
        formValues.estatus = 'PAGADO';
        ordenPagar(formValues)
    }

    return(
        <div>
            <h1 className="text-center mt-2 mb-5">Ordenes de Compra</h1>

            <table className="col-8 table m-auto" style={{ "display":"block", "height":"400px", "overflow-y":"scroll"}}>
                <thead className="thead-light">
                    <tr>
                        <th>#</th>
                        <th>Usuario</th>
                        <th># Producto</th>
                        <th>Monto</th>
                        <th>Status</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { orden.map(ord => (
                        <tr>

                        <td>{ord.id}</td>
                        <td>{ord.usuario}</td>
                        <td>{ord.productos}</td>
                        <td>{ord.precio}</td>
                        <td>{ord.estatus}</td>
                        <td>
                            <button name="pagar" 
                            className="btn btn-success my-2 my-sm-0"
                            onClick={() => handlePagar(ord.id)}
                            type="button">
                            Pagar
                            </button>
                        </td>
                        
                        <td>
                            <button name="eliminar" 
                                value={ord.id} 
                                onClick={() => handleSubmitBorrar(ord.id)} 
                                className="btn btn-warning my-2 my-sm-0" 
                                type="button">
                                Eliminar
                            </button>
                        </td>
                        
                        </tr>
                    )) }
                </tbody>
            </table>

            {/* Boton del modal */}
            <div className="mt-4 d-flex justify-content-center">
                <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModal3">
                    Agregar Orden
                </button>
            </div>
            {/* Modal */}
            <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Nueva Orden de Compra</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        
                        <h3 className="text-center mt-3">Escoge al usuario</h3>

                        <form onSubmit={handleSubmit}>
                            {/*Lista de usuarios*/}

                            <div className="d-flex justify-content-center mb-1">
                                <select className="btn btn-primary" name="usuario" onChange={handleChange} value={formValues.usuario}>
                                
                                <option className="btn btn-primary" value="usuario"  selected>Usuario</option>
                                { usuario.map(user => (
                                    <option className="btn btn-primary" value={user.nombre}>{user.nombre}</option>
                                )) }
                                </select>
                            </div>

                            {/*Lista de productos*/}
                            <div className="d-flex justify-content-center mt-3 mb-3">
                            <div className="d-flex justify-content-center mb-1">
                                <select className="btn btn-primary" name="productos" onChange={handleChange} value={formValues.productos}>
                                    
                                    <option className="btn btn-primary" value="usuario" selected>Producto</option>  
                                    { producto.map(pro => (
                                        <option className="btn btn-primary" value={pro.id}>{pro.nombre}</option>
                                    )) }
                                </select>

                                <select className="btn btn-primary ml-1" name="precio" onChange={handleChange} value={formValues.precio}>
                                    
                                    <option className="btn btn-primary" value="precio" selected>precio</option>  
                                    { producto.map(pro => (
                                        <option className="btn btn-primary" value={pro.precio}>{pro.precio}</option>
                                    )) }
                                </select>
                            </div>

                                <p className=" mr-1 ml-1">Cantidad</p>
                                <input 
                                    type="number" 
                                    name="cantidad"
                                    className="btn btn-primary" 
                                    style={{"width":"80px"}} 
                                    min="1" max= "10" 
                                    onChange={handleChange}
                                    value={formValues.cantidad}
                                    />
                                    
                            </div>

                            <label className="form-check-label" htmlFor="iva">Iva:</label>
                            <input 
                                type="text" 
                                name="iva" 
                                className="form-control"
                                placeholder="%%" 
                                onChange={handleChange}
                                value={formValues.iva}/>

                            <div className="card mt-3">
                                <div className="card-body">
                                    <table className="table table-striped">
                                        <tbody>
                                            <tr>
                                                <td className="font-weight-bolder">Subtotal</td>
                                                <td>{formValues.cantidad * formValues.precio}</td>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td className="font-weight-bolder">Iva</td>
                                                <td>{formValues.iva}</td>
                                            </tr>
                                        </tbody>
                                        <tbody>
                                            <tr>
                                                <td className="font-weight-bolder">Total</td>
                                                <td>{ formValues.cantidad * formValues.precio +  (formValues.precio * formValues.iva / 100)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                <button type="submit" className="btn btn-primary">Agregar</button>
                            </div>
                        </form>

                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Ordenes;