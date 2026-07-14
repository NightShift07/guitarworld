import { Link } from 'react-router-dom';
import { useState } from 'react';
import Contador from '../Contador/Contador';

import styles from './Item.module.css';

function Item(art) {

    return(
        <>
            <div className={styles.itemArticulo}>
                <Link to={`/catalogo/${art.id}`}>
                    <div className={styles.detArticulo}>
                        <img src={art.imagen} alt={art.modelo} />
                        <div className={styles.infoArticulo}>
                            <p className={styles.titulo}>{art.modelo}</p>
                            <p className={styles.valor}>$ {art.precio.toLocaleString('es-AR')}</p>
                            <p className={styles.stock}>{art.stock} articulos disponibles</p>
                        </div>
                    </div>
                </Link>
                <div className={styles.detArticulo}>
                    <Contador {...art}/>
                </div>
            </div>
        </>
    )
}

export default Item;