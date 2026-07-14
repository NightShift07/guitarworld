import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';

import Detail from './Detail';


const DetailContainer = () => {
    const { id } = useParams();
    const [articulo, setArticulo] = useState(null);

    useEffect(() => {
        if (!id) return;

        const qryArtId = query(
            collection(db, "articulos"),
            where("id", "==", Number(id))
        );

        getDocs(qryArtId)
            .then((resp) => {
                if (!resp.empty) {
                    setArticulo({ ...resp.docs[0].data() });
                } else {
                    console.log("Producto no encontrado en nuestro catalogo.");
                }
            })
            .catch((error) => {
                console.error("Error al cargar el producto:", error);
            });
    }, [id]);

    if (!articulo) {
        return <h2>Cargando detalles del articulo...</h2>;
    }

    return (
        <>
            <div className="container">
                <div className='detailLista'>
                    <Detail {...articulo} />
                </div>
            </div>
        </>
    )
}

export default DetailContainer;