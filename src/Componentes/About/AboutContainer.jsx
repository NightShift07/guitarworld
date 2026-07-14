import { useState, useEffect } from 'react';
import { doc, collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase/config';
import styles from './About.module.css';
import About from './About';

function AboutContainer() {

    const [perfiles, setPerfiles] = useState([]);
    const [error, setError] = useState(null);
    const [carga, setCarga] = useState(true);

    useEffect(() => {
        const perfList = collection(db, "equipo");
        getDocs(perfList)
            .then((resp) => {
                if (!resp.empty) {
                    setPerfiles( resp.docs.map((doc) => { return { ...doc.data() }}));
                }
            })
            .catch((error) => {
                console.error("Error al cargar los perfiles:", error);
            });
            setCarga(false);
    }, []);

    if (!perfiles) {
        return <h2>Cargando detalles de los perfiles...</h2>;
    }

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
        <div className={styles.tarjetas}>
            {perfiles.map((Aboutp) => (
                <About key={Aboutp.id} img={Aboutp.img} name={Aboutp.nombre} cargo={Aboutp.cargo} mail={Aboutp.mail} />
            ))}
        </div>
    );
}

export default AboutContainer;