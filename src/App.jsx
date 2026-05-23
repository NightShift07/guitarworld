/*estilos*/
import './App.css';

/*react*/
import { Routes, Route } from 'react-router-dom';

/*componentes*/
import Layout from './Layout/Layout';
import Inicio from './Componentes/Inicio/Inicio';
import ItemContainer from './Componentes/Item/ItemContainer';
import DetailContainer from './Componentes/Detail/DetailContainer';
import Cart from './Componentes/Cart/Cart';

function App() {
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route path='/' element={<Inicio />} />
                <Route path='/catalogo' element={<ItemContainer />} />
                <Route path='/catalogo/:id' element={<DetailContainer />} />
                <Route path='/carrito' element={<Cart />} />
            </Route>
        </Routes>
    )
}

export default App;