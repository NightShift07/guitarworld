import { Link } from 'react-router-dom';
import { useCart } from '../../Contexto/CartContext';
import { useAuth } from '../../Contexto/AuthContext';
import styles from './Header.module.css';

function Nav() {

    const { getCartCant } = useCart();
    const totItems = getCartCant();
    const { user, logout } = useAuth();

    const menuItems = [
        { icono: 'fi fi-rs-home-location-alt', nombre: 'Inicio', link: '/' },
        { icono: 'fi fi-rs-shop', nombre: 'Catalogo', link: '/catalogo' },
        { icono: 'fi fi-rs-users-alt', nombre: 'Nosotros', link:'/about-us' },
        { icono: 'fi fi-rs-shopping-cart-check', nombre: 'Carrito', link: '/carrito' },
        ...(user ? [user.nivel === 'admin' && { icono: 'fi fi-rs-settings-sliders', nombre: 'Panel de Control', link: '/control' }]
            :[{icono: 'fi fi-rs-user', nombre: 'Ingresar', link: '/login'}])
    ]
    
    return(
        <nav className="navBar">
            <img className="logo" src="/img/logo/logo_100.png" alt="logo" />
            <ul>
                {menuItems.map((menu,id) => {
                    if (menu.nombre != 'Carrito') 
                        return <li className={styles.navLi} key={id}><Link to={menu.link}><i className={menu.icono}></i> - {menu.nombre}</Link></li>
                    if (menu.nombre === 'Carrito')
                        return <li className={styles.navLi} key={id}><Link to={menu.link}><i className={menu.icono}></i> - {menu.nombre} - ({totItems})</Link></li>
                })}
                {user && (
                    <>
                        <li className={styles.navLi} >¡Hola, {user.nick}!</li>
                        <li className={styles.navLi} onClick={logout}>Cerrar Sesión</li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Nav;