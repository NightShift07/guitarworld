import './App.css';

import { Routes, Route } from 'react-router-dom';

import Layout from './Layout/Layout';

import Protection from './Componentes/Protection/Protection';
import Inicio from './Componentes/Inicio/Inicio';
import ItemContainer from './Componentes/Item/ItemContainer';
import DetailContainer from './Componentes/Detail/DetailContainer';
import AboutContainer from './Componentes/About/AboutContainer';
import Cart from './Componentes/Cart/Cart';
import CuponesContainer from './Componentes/Cupones/CuponesContainer';
import ControlContainer from './Componentes/Control/ControlContainer';
import UserLoginContainer from './Componentes/UserLogin/UserLoginContainer';
import UserRegisterContainer from './Componentes/UserRegister/UserRegisterContainer';

function App() {
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Inicio />} />
                <Route path='/catalogo' element={<ItemContainer />} />
                <Route path='/catalogo/:id' element={<DetailContainer />} />
                <Route path='/about-us' element={<AboutContainer />} />
                <Route path='/carrito' element={<Cart />} />
                <Route element={<Protection lvlAuth={["admin"]} />}>
                    <Route path='/cupones' element={<CuponesContainer />} />
                    <Route path='/control' element={<ControlContainer />} />
                </Route>
                <Route path='/login' element={<UserLoginContainer />} />
                <Route path='/register' element={<UserRegisterContainer />} />
            </Route>
        </Routes>
    )
}

export default App;