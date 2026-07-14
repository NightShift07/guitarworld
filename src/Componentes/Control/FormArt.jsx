import React from 'react';
import styles from './FormArt.module.css'

function FormArt({ datosArt, fncUpdChg, fncUpdSnd, fncImgChg, carga, sttUpdating }) {
    return (
        <form className={styles.frmArt} onSubmit={fncUpdSnd}>
            <h3>{sttUpdating? "Actualizar articulo:" : "Agregar nuevo articulo:"}</h3>
            <div>
                <label name="lblId" id="lblMarca" htmlFor="id">Id:</label>
                <input type="number" name="id" id="id" placeholder="Ingrese el Id" value={datosArt.id} onChange={fncUpdChg} />
            </div>
            <div>
                <label name="lblMarca" id="lblMarca" htmlFor="marca">Marca:</label>
                <input type="text" name="marca" id="marca" placeholder="Ingrese la marca" value={datosArt.marca} onChange={fncUpdChg} />
            </div>
            <div>
                <label name="lblModelo" id="lblModelo" htmlFor="modelo">Modelo:</label>
                <input type="text" name="modelo" id="modelo" placeholder="Ingrese el modelo" value={datosArt.modelo} onChange={fncUpdChg} />
            </div>
            <div>
                <label name="lblDesc" id="lblDesc" htmlFor="descripcion">Descripcion:</label>
                <input type="textarea" name="descripcion" id="descripcion" placeholder="Ingrese una descripcion" value={datosArt.descripcion} onChange={fncUpdChg} />
            </div>
            <div>
                <label name="lblPrecio" id="lblPrecio" htmlFor="precio">Precio:</label>
                <input type="number" name="precio" id="precio" placeholder="Ingrese el precio" value={datosArt.precio} onChange={fncUpdChg} />
            </div>
            <div>
                <label name="lblCat" id="lblCat" htmlFor="categoria">Categoria:</label>
                <input list="text" name="categoria" id="categoria" placeholder="Ingrese la categoria" value={datosArt.categoria} onChange={fncUpdChg} />
            </div>
            <div>
                <label name="lblImagen" id="lblImagen" htmlFor="imagen">Imagen:</label>
                <input type="file" name="imagen" id="imagen" placeholde="Seleccione una imagen" onChange={fncImgChg} />
            </div>
            <div>
                <label name="lblStock" id="lblStock" htmlFor="stock">Stock:</label>
                <input type="number" name="stock" id="stock" placeholder="Ingrese el stock" value={datosArt.stock} onChange={fncUpdChg} />
            </div>
            <button type="submit" name="btnGuardar" id="btnGuardar" disabled={carga}>{carga ? "Cargando datos" : sttUpdating? "Actualizar articulo" : "Guardar articulo"}</button>
        </form>
    );
}

export default FormArt;