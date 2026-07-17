import React from "react";
import { Link } from 'react-router-dom';
import { useCart } from '../../Contexto/CartContext';

import styles from './Cart.module.css'

function Cart() {
    const { cart, addToCart, delFromCart, delArt, clearCart, getCartTot } = useCart();

    if (cart.length === 0) {
        return (
            <div className={styles.cartContainer}>
                <div className={styles.cartContVacio}>
                    <div className={styles.cartContVacioInt}>
                        <p className={styles.p1}>Aun no hay articulos en el carrito.</p>
                        <p className={styles.p2}>Agrega articulos desde el catalogo para continuar con la compra.</p>
                    </div>
                    <div className={styles.cartContVacioInt}>
                        <Link to={`/catalogo`}><p className={styles.p3}>Ir al catalogo</p></Link>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={styles.cartContainer}>
                <div className={styles.cartContTable}>
                    <table className={styles.cartTable}>
                        <caption className={styles.cartTableCaption}>Resumen de compra:</caption>
                        <thead>
                            <tr className={styles.cartTableHeader}>
                                <td className={styles.td1}>Imagen</td>
                                <td className={styles.td2}>Articulo</td>
                                <td className={styles.td3}>Cantidad</td>
                                <td className={styles.td4}>Valor</td>
                                <td className={styles.td5}>Subtotal</td>
                                <td className={styles.td6}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((cartItem) => {
                                return (
                                    <tr key={cartItem.id} className={styles.cartItem}>
                                        <td className={styles.cartImg}><img src={cartItem.imagen} alt={cartItem.modelo} /></td>
                                        <td className={styles.cartName}>{cartItem.modelo}</td>
                                        <td className={styles.cartCant}><i className="fi fi-rs-square-plus" onClick={() => addToCart(cartItem, 1)}></i>  {cartItem.cant}  <i className="fi fi-rs-square-minus" onClick={() => delFromCart(cartItem, 1)}></i></td>
                                        <td className={styles.cartValor}>${cartItem.precio}</td>
                                        <td className={styles.cartSub}>${(cartItem.precio * cartItem.cant)}</td>
                                        <td className={styles.cartDel} onClick={() => delArt(cartItem.id)}><i className="fi fi-rs-trash" ></i></td>
                                    </tr>
                                )
                            })}
                            <tr className={styles.cartTotal}>
                                <td className={styles.cartTotTitle} colSpan="4">Total a pagar:</td>
                                <td className={styles.cartTotalVal}>${getCartTot().toLocaleString('es-AR')}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.cartContBotones}>
                        <p onClick={clearCart} className={styles.cartBoton}>Vaciar Carrito</p>
                        <Link to={`/catalogo`}><p className={styles.cartBoton}>Ir al catalogo</p></Link>
                    </div>
                </div>
            </div>
        );
    }


};

export default Cart;