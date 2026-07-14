import { useCart } from '../../Contexto/CartContext';
import { useState } from 'react';

import styles from './Contador.module.css';

function Contador(art) {
    
    const artic = {...art};
    const [cant, setCant] = useState(0);
    
    const addUnit = () => {
        if (cant < artic.stock)
            setCant(cant + 1);
    }
    const remUnit = () => {
        if (cant > 0)
            setCant(cant - 1);
    }

    const { addToCart } = useCart();
    const handleAddToCart = () => {
        if (cant > 0) {
            addToCart(artic, cant);
            alert(`Se ha agregado ${art.modelo} al carrito.`);
        };
    };

    return (
        <>
            <div className={styles.container}>
                <p className={styles.unidad} onClick={remUnit}> - </p>
                <p className={styles.cant}> {cant} </p>
                <p className={styles.unidad} onClick={addUnit}> + </p>
            </div>
            <div className={styles.container}>
                <p className={styles.addCart} onClick={handleAddToCart}><i className='fi fi-rs-shopping-cart-check'></i> - Agregar al carrito</p>
            </div>
        </>
    )
}

export default Contador;