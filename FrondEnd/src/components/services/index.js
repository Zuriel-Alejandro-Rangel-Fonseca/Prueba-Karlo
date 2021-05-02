import axios from 'axios';

const url = 'http://localhost:4000';


//=========================Operaciones de usuario=========================
//Insertar nuevo usuario
export async function guardarUsuario (formValues) {
    try {
         axios.post(`${url}/api/usuario`, 
        {
            nombre: formValues.nombre,
            correo: formValues.correo,
            contrasena: formValues.contrasena
        })
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })
    } catch (error) {
        console.log(error);
    }
}

//Optener todos
export async function obtenerTodosUsuarios(){
    try {
        return await axios.get(`${url}/api/usuario`);

    } catch (error) {
        console.log(error);
    }
} 

//Optener uno
export async function obtenerUnUsuario(id){
    try {
        return await axios.get(`${url}/api/usuario/${id}`);

    } catch (error) {
        console.log(error);
    }
} 

//Borrar usuario
export async function borrarUsuario(id,nombre){
    try {
        axios.delete(`${url}/api/usuario/${nombre}/${id}`, {
        })
    } catch (error) {
        console.log(error);
    }
}


//=========================Operaciones de productos=========================
//Insertar nuevo producto
export async function guardarProducto (formValues) {
    try {
        console.log(formValues);

        axios.post(`${url}/api/productos`, 
        {
            nombre: formValues.nombre,
            cantidad: formValues.cantidad,
            precio: formValues.precio,
        })
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })
        
    } catch (error) {
        console.log(error);
    }
}

//Optener todos
export async function obtenerTodosProductos(){
    try {

        return await axios.get(`${url}/api/productos/`);
    } catch (error) {
        console.log(error);
    }
} 

//Borrar prooductos
export async function borrarProducto(id){
    try {
        axios.delete(`${url}/api/productos/${id}`, {

        })

    } catch (error) {
        console.log(error);
    }
}

//editar prooductos 
export async function editarProducto(formValues){
    try {
        axios.put(`${url}/api/productos/${formValues.id}`, {
            nombre: formValues.nombre,
            cantidad: formValues.cantidad,
            precio: formValues.precio,
        })
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })

    } catch (error) {
        console.log(error);
    }
}


//=========================Operaciones de ordenes=========================
//Insertar nuevo ordenes
export async function guardarOrden (formValues) {
    try {
        console.log(formValues);

        axios.post(`${url}/api/orden`, 
        {
            usuario: formValues.usuario,
            productos: formValues.productos,
            precio:   (formValues.cantidad * formValues.precio +  (formValues.precio * formValues.iva / 100)),
            estatus: formValues.estatus
        })
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })
        
    } catch (error) {
        console.log(error);
    }
}

//Optener todos
export async function obtenerTodosOrden(){
    try {

        return await axios.get(`${url}/api/orden`);
        
    } catch (error) {
        console.log(error);
    }
} 

//Borrar productos
export async function borrarOrden(id){
    try {
        axios.delete(`${url}/api/orden/${id}`, {

        })

    } catch (error) {
        console.log(error);
    }
}

//Editar orden
export async function ordenPagar(formValues){
    try {
        axios.put(`${url}/api/orden/${formValues.id}`, {
            estatus: formValues.estatus
        })
        .then(res =>{
            console.log(res);
            console.log(res.data);
        })
    } catch (error) {
        console.log(error);
    }
}