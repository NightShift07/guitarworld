import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc } from "firebase/firestore";

//import FormArtContainer from '../FormArt/FormArtContainer';
import FormArt from './FormArt';


const ControlContainer = () => {
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
                console.log("Subiendo imagen a Imgbb...");

                const respImgbb = await
                    fetch(`https://api.imgbb.com/1/upload?key=${apiKeyImgbb}`, { method: 'POST', body: formData, });

                const datImgbb = await respImgbb.json();

                if (datImgbb.success) {
                    console.log("Imagen subida con éxito. URL:", datImgbb.data.url);
                    dirImg = datImgbb.data.url;
                } else {
                    throw new Error('La subida de la imagen a Imgbb falló.');
                    alert("Hubo un error al subir la imagen. Por favor, intenta nuevamente.");
                }
            }

            const fullArt = { ...datosArt, imagen: dirImg };
            console.log('Enviando informacion a Firebase: ', fullArt);

            const dbArt = collection(db, "articulos");
            
            if(sttUpdating){
                const docArtRef = doc(db, "articulos", updatingArt.docId);
                console.log("fullArt:", fullArt);

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
            console.error("Error en el proceso de envío:", error);
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
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto ? ");
        if (confirmacion) {
            const docRef = doc(db, "articulos", id);
            await deleteDoc(docRef);

            setArticulos(articulos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };

    const sttUpdating = updatingArt !== null;

    useEffect(() => {
        fncLoaddArt();
    }, []);

    return (
        <div>
            <h2>Gestión de Productos</h2>
            <hr />
            <FormArt datosArt={datosArt} fncUpdChg={fncUpdChg} fncUpdSnd={fncUpdSnd} fncImgChg={fncImgChg} carga={carga} sttUpdating={sttUpdating} />
            <hr />
            <h3>Lista de Productos</h3>
            <ul>
                {articulos.map((prod) => (
                    <li key={prod.id}>
                        -- {prod.id} - {prod.modelo} - ${prod.precio}
                        {/*acá agregamos los botones de acción */}
                        <button onClick={() => fncArtUpd(prod)} >Actualizar</button>
                        <button onClick={() => fncArtDel(prod.id)} >Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ControlContainer;