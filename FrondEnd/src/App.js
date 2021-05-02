import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import InicioSesion from './components/inicioSesion/InicioSesion';
import './App.css';



//Layouts 
import Saludo from './components/container/Saludo';
import Usuarios from './layout/usuarios/Usuarios';
import Productos from './layout/productos/Productos';
import OrdenCompra from './layout/ordenCompra/OrdenCompra';

function App() {
  return (
    <div className="row">
      <Sidebar />
        <div className="col-10">
          <InicioSesion />

          <BrowserRouter>
            <Switch>

              <Route exact path="/" component={Saludo}/>
              <Route exact path="/layout/usuarios" component={Usuarios} />
              <Route exact path="/layout/productos" component={Productos} />
              <Route exact path="/layout/ordenCompra" component={OrdenCompra} />

            </Switch>
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
