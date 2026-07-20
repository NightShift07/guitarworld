import { useParams } from "react-router-dom";
import styles from './Cupones.module.css';

export function FormCupones({ datosDesc, fncUpdSnd, fncDescChg, sttUpdating }) {
    return (
        <div className={styles.cupGroup}>
            <div>
                <form onSubmit={fncUpdSnd}>
                    <h3>{sttUpdating ? "Actualizar cupon:" : "Agregar nuevo cupon:"}</h3>
                    <div className={styles.artFrmItem}>
                        <label htmlFor="name" >Codigo de descuento:</label>
                        <input required name="name" type="text" placeholder="Codigo" value={datosDesc.name} onChange={fncDescChg} />
                    </div>
                    <div className={styles.artFrmItem}>
                        <label htmlFor="desc">Porcentaje de descuento:</label>
                        <input required name="desc" type="number" placeholder="Descuento" min="1" max="100" value={datosDesc.desc} onChange={fncDescChg} />
                    </div>
                    <div>
                        <button type="submit">{sttUpdating ? "Actualizar cupon" : "Crear cupon"}</button>
                    </div >
                </form>
            </div>
        </div>
    )
}

export function ListCupones({ cupones, fncDescUpd, fncDescDel }) {
    return (
        <div className={styles.cupGroup}>
            <div>
                <h3>Listado de Cupones</h3>
            </div>
            <div>
                <ul>
                    {cupones.map((cupon) => (
                        <li key={cupon.docId}>
                            {cupon.name} - ${cupon.desc}%
                            <button onClick={() => fncDescUpd(cupon)} >Modificar</button>
                            <button onClick={() => fncDescDel(cupon.docId)} >Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};