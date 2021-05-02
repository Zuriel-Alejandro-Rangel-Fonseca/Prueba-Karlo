import React, {Component} from 'react';
import logo from '../../assets/img/logo.png';


class Sidebar extends Component{
    render(){
        return(
        <div className="col-2 col-sm-2 bg-info" style={{"height":"800px", "width": "200px"}}>
            <img src={logo} alt="logo" style={{"width":"250px"}}></img>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a className="nav-link text-light" href="/layout/usuarios">Usuarios</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-light" href="/layout/productos">Productos</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link text-light" href="/layout/ordenCompra">Ordenes de Compra</a>
                </li>
            </ul>
            <hr className="d-sm-none" />
        </div>
        )
    }
}
export default Sidebar;