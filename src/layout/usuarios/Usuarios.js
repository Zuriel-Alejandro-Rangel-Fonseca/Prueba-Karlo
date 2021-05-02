import React, { useState, useEffect } from 'react';
import { guardarUsuario, obtenerTodosUsuarios, borrarUsuario, obtenerUnUsuario } from '../../components/services/index.js';

const Usuarios = () => {
    
    const [usuario, setUsuaurio] = useState([]);

    useEffect(() => {
        const api = async () => {
            const result = await obtenerTodosUsuarios();
            setUsuaurio(result.data.data);
        } 
        api();  
        
    }, []);

    const [formValues, setFormValues] = useState({
        id: '',
        idBusqueda: '',
        nombre: '',
        correo: '',
        contrasena: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        guardarUsuario({...formValues});
    }

    const handleSubmitBorrar = (event,nombre) => {
        borrarUsuario(event,nombre);
    }

    const handleUnUsuario = (event) => {
        event.preventDefault();
        obtenerUnUsuario(event);
    }

    return(
        <>
            <div>
                <h1 className="text-center mt-2 mb-5">usuarios</h1>

                {/*Barra de busqueda*/}
                <div className="mb-3 d-flex justify-content-center">
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="text" placeholder="ID usuario" onChange={handleChange} value={formValues.idBusqueda} aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0 mr-1" type="button" onClick={ () => handleUnUsuario(formValues.idBusqueda)} >Buscar</button>
                    </form>
                </div>

                <table className="col-8 table m-auto" style={{ "display":"block", "width": "550px", "height":"400px", "overflow-y":"scroll"}}>
                    <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th></th>
                        </tr>
                    </thead>
                       
                    <tbody >
                        { usuario.map(user => (
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.nombre}</td>
                                <td>{user.correo}</td>
                                <td><button type="button" name="id" value={user.id} onClick={() => handleSubmitBorrar(user.id, user.nombre)} className="btn btn-warning my-2 my-sm-0">Eliminar</button></td>
                            
                            </tr>
                        )) }
                    </tbody>
                </table>

                {/* Boton del modal */}
                <div className="mt-4 d-flex justify-content-center">
                    <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#exampleModal3">
                        Agregar Usuarios
                    </button>
                </div>
                {/* Modal */}
                <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModal3Label" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModal3Label">Agregar Usuarios</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="nombre">Nombre</label>
                                        <input 
                                            className="form-control" 
                                            placeholder="Nombre"
                                            onChange={handleChange}
                                            name="nombre" 
                                            value={formValues.nombre}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="correo">E-mail</label>
                                        <input 
                                            type="email" 
                                            name="correo" 
                                            className="form-control"
                                            placeholder="E-mail" 
                                            onChange={handleChange}
                                            value={formValues.email}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="contrasena">Contraseña</label>
                                        <input 
                                            type="password" 
                                            name="contrasena" 
                                            className="form-control" 
                                            placeholder="Contraseña" 
                                            onChange={handleChange}
                                            value={formValues.contrasena}
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
            </div>
        </>
    );
}

export default Usuarios;


