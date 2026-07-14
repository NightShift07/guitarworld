/*estilos*/
import './App.css';

/*react*/
import { Routes, Route } from 'react-router-dom';

/*componentes*/
import Layout from './Layout/Layout';

import Inicio from './Componentes/Inicio/Inicio';
import ItemContainer from './Componentes/Item/ItemContainer';
import DetailContainer from './Componentes/Detail/DetailContainer';
import AboutContainer from './Componentes/About/AboutContainer';
import Cart from './Componentes/Cart/Cart';
import ControlContainer from './Componentes/Control/ControlContainer';
import LoginContainer from './Componentes/Login/LoginContainer';

function App() {
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Inicio />} />
                <Route path='/catalogo' element={<ItemContainer />} />
                <Route path='/catalogo/:id' element={<DetailContainer />} />
                <Route path='/about-us' element={<AboutContainer />} />
                <Route path='/carrito' element={<Cart />} />
                <Route path='/control' element={<ControlContainer />} />
                <Route path='/login' element={<LoginContainer />} />
            </Route>
        </Routes>
    )
}

export default App;