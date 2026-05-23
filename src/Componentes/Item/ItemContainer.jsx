import react, {useState, useEffect } from 'react';

import Item from './Item';


function ItemContainer() {
    
    const [articulos, setArticulos] = useState([]);
    const [error, setError] = useState(null);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        fetch('/api/articulos.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('Error al cargar el archivo');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setArticulos(datos);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setCarga(false);
            });
    }, []);

    if (carga) {
        return (
            <div>
                <p>Cargando lista de productos...</p>
                <p>Por favor, aguarde un momento...</p>
            </div>
        );
    }
    
    if (error) {
        return (
            <div>
                <p>Error al cargar el archivo.</p>
                <p>Error: {error}</p>
            </div>
        )
    }

    return(
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