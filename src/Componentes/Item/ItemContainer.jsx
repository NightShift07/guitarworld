import react, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy} from 'firebase/firestore';
import { db } from '../../Firebase/Config';
import Item from './Item';

function ItemContainer() {
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        const prodList = query(collection(db, "articulos"),orderBy("id","asc"));
        getDocs(prodList)
            .then((resp) => {
                if (!resp.empty) {
                    setArticulos( resp.docs.map((doc) => { return { ...doc.data(), docId: doc.id }}))
                } else {
                    console.log("Producto no encontrado en nuestro catalogo.");
                }
            })
            .catch((error) => {
                console.error("Error al cargar los articulos:", error);
            });
    }, []);

    if (!articulos) {
        return <h2>Cargando detalles de los articulos...</h2>;
    }

    return (
        <div className="container">
            <div className='itemLista'>
                {articulos.map((articulo) => {
                    return(
                        <Item key={articulo.id} {...articulo} />
                    )
                })}
            </div>
        </div>
    )
}

export default ItemContainer;