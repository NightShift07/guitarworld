import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";
import { FormArt, ListArt } from './Articulos';
import styles from './Articulos.module.css';

const ArticulosContainer = () => {
    const [articulos, setArticulos] = useState([]);

    const initForm = {
        id: '',
        marca: '',
        modelo: '',
        descripcion: '',
        precio: '',
        categoria: '',
        stock: '',
        imagen: ''
    };

    const [datosArt, setDatosArt] = useState(initForm);
    const [imgFile, setImgFile] = useState(null);
    const [carga, setCarga] = useState(false);
    const [updatingArt, setUpdatingArt] = useState(null);

    const fncUpdChg = (evento) => {
        const { name, type, value, valueAsNumber } = evento.target;
        setDatosArt({ ...datosArt, [name]: type === "number" ? valueAsNumber : value });
    };

    const fncImgChg = (evento) => {
        setImgFile(evento.target.files[0]);
    }

    const fncUpdSnd = async (evento) => {
        evento.preventDefault();
        if (!imgFile && !updatingArt) {
            alert("Por favor, selecciona una imagen para el producto.");
            return;
        }

        setCarga(true);
        console.log("Cargando...");

        const apiKeyImgbb = '6c02668ec9f740e95a2dce0483e90b18';
        const formData = new FormData();
        formData.append('image', imgFile);

        let dirImg = datosArt.imagen;

        try {
            if (imgFile) {
                console.log('Subiendo imagen...');

                const respImgbb = await
                    fetch(`https://api.imgbb.com/1/upload?key=${apiKeyImgbb}`, { method: 'POST', body: formData, });

                const datImgbb = await respImgbb.json();

                if (datImgbb.success) {
                    console.log('Imagen subida con éxito.');
                    dirImg = datImgbb.data.url;
                } else {
                    throw new Error('La subida de la imagen falló.');
                    alert('Hubo un error al subir la imagen. Por favor, intenta nuevamente.');
                }
            }

            const fullArt = { ...datosArt, imagen: dirImg };
            console.log('Guardando informacion');

            const dbArt = collection(db, "articulos");
            
            if(sttUpdating){
                const docArtRef = doc(db, "articulos", updatingArt.docId);

                delete fullArt.docId;
                await updateDoc(docArtRef, fullArt);
            } else {
                await addDoc(dbArt, fullArt);
            }

            evento.target.reset();

            await fncLoaddArt();

            setDatosArt(initForm);
            setImgFile(null);
            setUpdatingArt(null);
        } catch (error) {
            console.error('Error en el proceso de envío:', error);
        }

        finally {
            setCarga(false);
        }
    };

    const fncLoaddArt = async () => {
        const refArticulos = collection(db, "articulos");
        const resp = await getDocs(refArticulos);
        setArticulos(
            resp.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
        );
    };

    const fncArtUpd = (articulo) => {
        setUpdatingArt(articulo);
        setDatosArt(articulo);
    };

    const fncArtDel = async (id) => {
        const confirmacion = window.confirm("¿Desea eliminar este articulo ?");
        if (confirmacion) {
            try{
                const docRef = doc(db, "articulos", id);
                await deleteDoc(docRef);

                await fncLoaddArt;
                alert("Articulo eliminado.");
            } catch (error) {
                console.error("Error al eliminar el articulo:", error);
            }
        }
    };

    const limitTxt = (txt, cant) => {
        return txt.length > cant
            ? txt.slice(0, cant) + "..."
            : txt;
    };

    const sttUpdating = updatingArt !== null;

    useEffect(() => {
        fncLoaddArt();
    }, []);

    return (
        <div className={styles.artContainer} >
            <div>
                <h2>Gestión de Productos</h2>
            </div>
            <FormArt datosArt={datosArt} fncUpdChg={fncUpdChg} fncUpdSnd={fncUpdSnd} fncImgChg={fncImgChg} carga={carga} sttUpdating={sttUpdating} />
            <ListArt articulos={articulos} fncArtUpd={fncArtUpd} fncArtDel={fncArtDel} limitTxt={limitTxt} />
        </div>
    );
};

export default ArticulosContainer;