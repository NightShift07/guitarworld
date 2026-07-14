import { useState } from 'react';
import Contador from '../Contador/Contador';

import styles from './Detail.module.css';

function Detail(art) {

    return(
        <>
            <div className={styles.detailArticulo}>
                <div className={styles.detDetail}>
                    <img src={art.imagen} alt={art.modelo} />
                    <div className={styles.infoDetail}>
                        <p className={styles.titulo}>{art.modelo}</p>
                        <p className={styles.descripcion}>{art.descripcion}</p>
                        <p className={styles.valor}>$ {art.precio.toLocaleString('es-AR')}</p>
                        <p className={styles.stock}>{art.stock} disponibles</p>
                    </div>
                </div>
                <div className={styles.detArticulo}>
                    <Contador {...art}/>
                </div>
            </div>
        </>
    )
}

export default Detail;