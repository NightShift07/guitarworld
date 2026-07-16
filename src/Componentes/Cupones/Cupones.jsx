import { useParams } from "react-router-dom";
import styles from './Cupones.module.css';

export function FormCupones({ datosDesc, fncUpdSnd, fncDescChg }) {

    return (
        <div>
            <div>
                <h2>Administración de Cupones</h2>
            </div>
            <div>
                <form onSubmit={fncUpdSnd}>
                    <input required name="name" type="text" placeholder="Codigo" value={datosDesc.name} onChange={fncDescChg} />
                    <input required name="desc" type="number" placeholder="Descuento" min="1" max="100" value={datosDesc.desc} onChange={fncDescChg} />
                    <button type="submit">Crear Cupón</button>
                </form>
            </div>
        </div>
    )
}

export function ListCupones({ cupones, fncDescUpd, fncDescDel }) {
    return (
        <div>
            <div>
                <h3>Listado de Cupones</h3>
            </div>
            <div>
                <ul>
                    {cupones.map((cupon) => (
                        <li key={cupon.docId}>
                            {cupon.docId} - {cupon.name} - ${cupon.desc}%
                            <button onClick={() => fncDescUpd(cupon)} >Modificar</button>
                            <button onClick={() => fncDescDel(cupon.docId)} >Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
};