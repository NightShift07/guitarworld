import { useState, useEffect } from 'react';
import Perfil from './Perfil';

function PerfilContainer() {

    const [perfiles, setPerfiles] = useState([]);
    const [error, setError] = useState(null);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        fetch('/api/equipo.json')
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error('Error al cargar el archivo');
                }
                return respuesta.json();
            })
            .then((datos) => {
                setPerfiles(datos);
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
                <p>Cargando perfiles del equipo...</p>
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

    return (
        <>
            {perfiles.map((perfil) => (
                <Perfil key={perfil.id} img={perfil.img} name={perfil.nombre} cargo={perfil.cargo} mail={perfil.mail} />
            ))}
        </>
    );
}

export default PerfilContainer;