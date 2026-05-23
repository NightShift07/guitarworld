import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Detail from './Detail';

const DetailContainer = () => {

    const { id } = useParams();
    const [articulo, setArticulo] = useState(null);

    useEffect(() => {
        fetch('/api/articulos.json')
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                const artFind = datos.find((art) => art.id === parseInt(id));
                setArticulo(artFind);
            })
            .catch(error => console.error('Ups, ha ocurrido un error. Error: ', error));
    }, [id]);

    if (!articulo) {
        return <h2>Cargando detalles del articulo...</h2>;
    }

    if (!articulo.id) {
        return <h2>Articulo no encontrado.</h2>;
    }

    return(
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