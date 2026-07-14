import { useState, useEffect } from 'react';
import About from './About';

function AboutContainer() {

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
            {perfiles.map((Aboutp) => (
                <About key={Aboutp.id} img={Aboutp.img} name={Aboutp.nombre} cargo={Aboutp.cargo} mail={Aboutp.mail} />
            ))}
        </>
    );
}

export default AboutContainer;