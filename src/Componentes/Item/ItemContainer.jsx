import react, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs} from 'firebase/firestore';
import { db } from '../../Firebase/Config';

import Item from './Item';


function ItemContainer() {
    const [articulos, setArticulos] = useState([]);

    useEffect(() => {
        const prodList = collection(db, "articulos");
        getDocs(prodList)
            .then((resp) => {
                if (!resp.empty) {
                    setArticulos(
                        resp.docs.map((doc) => {
                            return { ...doc.data() }
                        })
                    )
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
                {articulos.map((articulo) => (
                    <Item key={articulo.id} {...articulo} />
                ))}
            </div>
        </div>
    )
}

export default ItemContainer;