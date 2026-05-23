import { Link } from 'react-router-dom';

import { useCart } from '../../Contexto/CartContext';

function Nav() {
    const menuItems = [
        { icono: 'fi fi-rs-home-location-alt', nombre: 'Inicio', link: '/' },
        { icono: 'fi fi-rs-shop', nombre: 'Catalogo', link: '/catalogo' },
        { icono: 'fi fi-rs-shopping-cart-check', nombre: 'Carrito', link: '/carrito' }
    ];
    const { getCartCant } = useCart();
    const totItems = getCartCant();
    
    return(
        <nav className="navBar">
            <img className="logo" src="/img/logo/logo_100.png" alt="logo" />
            <ul>
                {menuItems.map((menu,id) => {
                    if (id != 2) 
                        return <li key={id}><Link to={menu.link}><i className={menu.icono}></i> - {menu.nombre}</Link></li>
                    if (id == 2)
                        return <li key={id}><Link to={menu.link}><i className={menu.icono}></i> - {menu.nombre} - ({totItems})</Link></li>
                })}
            </ul>
        </nav>
    )
}

export default Nav;