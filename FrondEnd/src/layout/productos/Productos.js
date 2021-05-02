import React, { useState, useEffect} from 'react';
import { guardarProducto, obtenerTodosProductos, borrarProducto, editarProducto } from '../../components/services/index.js';

const Productos = () => {

    const [producto, setProducto] = useState([]);

    useEffect(() => {
        const api = async () => {
            const result = await obtenerTodosProductos();
            setProducto(result.data.data);
        }
        api();
        
    }, []);

    const [formValues, setFormValues] = useState({
        id:'',
        nombre: '',
        cantidad: '',
        precio: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        guardarProducto({...formValues});
    }

    const handleSubmitBorrar = (event) => {
        borrarProducto(event);
    }

    const handleEditar = (ide, nom, can, pre) => {
        formValues.id = ide;
        formValues.nombre = nom;
        formValues.cantidad = can;
        formValues.precio = pre;
    }

    const handleSubmitEditar = (event) => {
        event.preventDefault();
        editarProducto({...formValues});
    }

    return(
            <>
            <div>
                <h1 className="text-center mt-2 mb-5">Productos</h1>

                {/*Barra de busqueda*/}
                <div className="mb-3 d-flex justify-content-center">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="ID usuario" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0 mr-1" type="submit">Buscar</button>
                    </form>
                </div>

                <table className="col-8 table m-auto" style={{ "display":"block", "height":"400px", "overflow-y":"scroll"}}>
                    <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Nombre Producto</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { producto.map(pro => (
                            
                            <tr>
                                <td>{pro.id}</td>
                                <td>{pro.nombre}</td>
                                <td>{pro.cantidad}</td>
                                <td>{pro.precio}</td>
                                <td>
                                    <button 
                                        type="button" 
                                        data-toggle="modal" 
                                        data-target="#exampleModal4" 
                                        onClick={() => handleEditar(pro.id, pro.nombre, pro.cantidad, pro.precio)} 
                                        className="btn btn-secondary my-2 my-sm-0">
                                        Editar
                                    </button>
                                </td>
                                
                                <td>
                                    <button 
                                        type="button" 
                                        name="id" 
                                        value={pro.id} 
                                        onClick={() => handleSubmitBorrar(pro.id)} 
                                        className="btn btn-warning my-2 my-sm-0" >
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
                        Agregar Producto
                    </button>
                </div>
                {/* Modal Agregar*/}
                <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModal3Label">Agregar Producto</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        className="form-control" 
                                        placeholder="Nombre" 
                                        onChange={handleChange}
                                        value={formValues.nombre}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cantidad">Cantidad</label>
                                    <input 
                                        type="number" 
                                        name="cantidad" 
                                        className="form-control"
                                        placeholder="Cantidad"
                                        min="1" 
                                        onChange={handleChange}
                                        value={formValues.cantidad}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Precio</label>
                                    <input 
                                        type="text" 
                                        name="precio" 
                                        className="form-control"
                                        placeholder="Precio" 
                                        onChange={handleChange}
                                        value={formValues.precio}
                                    />
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


                {/* Modal Editar*/}
                <div className="modal fade" id="exampleModal4" tabIndex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModal3Label">Editar Producto</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                
                            <form onSubmit={handleSubmitEditar}>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input 
                                        type="text" 
                                        name="nombre" 
                                        className="form-control" 
                                        placeholder="Nombre" 
                                        onChange={handleChange}
                                        value={formValues.nombre}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cantidad">Cantidad</label>
                                    <input 
                                        type="number" 
                                        name="cantidad" 
                                        className="form-control"
                                        placeholder="Cantidad"
                                        min="1" 
                                        onChange={handleChange}
                                        value={formValues.cantidad}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Precio</label>
                                    <input 
                                        type="text" 
                                        name="precio" 
                                        className="form-control"
                                        placeholder="Precio" 
                                        onChange={handleChange}
                                        value={formValues.precio}
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Editar</button>
                                </div>
                            </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
        

export default Productos;