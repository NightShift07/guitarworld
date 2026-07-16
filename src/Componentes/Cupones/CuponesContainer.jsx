import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FormCupones, ListCupones } from "./Cupones";

const CuponesContainer = () => {

    const [cupones, setCupones] = useState([]);
    const [carga, setCarga] = useState(false);
    const [updatingDesc, setUpdatingDesc] = useState(null);

    const initDesc = {
        name: '',
        desc: ''
    };

    const [datosDesc, setDatosDesc] = useState(initDesc);

    const fncDescChg = (evento) => {
        const { name, type, value, valueAsNumber } = evento.target;
        setDatosDesc({ ...datosDesc, [name]: type === "number" ? valueAsNumber : value });
    };


    const fncUpdSnd = async (evento) => {
        evento.preventDefault();

        if (!datosDesc.name || !datosDesc.desc) {
            alert("Complete todos los campos");
            return;
        }

        if (datosDesc.desc <= 1 || datosDesc.desc >= 100) {
            alert("El descuento debe estar entre 1 y 100.");
            return;
        }

        setCarga(true);
        console.log("Cargando...");

        const formData = new FormData();

        try {
            console.log('Guardando informacion');

            const dbDesc = collection(db, "cupones");

            if (sttUpdating) {
                const docDescUpd = doc(db, "cupones", updatingDesc.docId);

                delete datosDesc.docId;
                await updateDoc(docDescUpd, datosDesc);
            } else {
                await addDoc(dbDesc, datosDesc);
            }

            evento.target.reset();

            await fncDescLoad();

            setDatosDesc(initDesc);
            setUpdatingDesc(null);
        } catch (error) {
            console.error('Error en el proceso de envío:', error);
        }

        finally {
            setCarga(false);
        }
    };


    const fncDescLoad = async () => {
        try {
            const refCupones = collection(db, "cupones");
            const resp = await getDocs(refCupones);
            setCupones(
                resp.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
            );
        } catch (error) {
            console.error("Error al obtener la lista de cupones:", error);
        }
    };

    const fncDescUpd = (descuento) => {
        setUpdatingDesc(descuento);
        setDatosDesc(descuento);
    };

    const fncDescDel = async (id) => {
        const confirmacion = window.confirm("¿Desea eliminar este cupon?");
        if (confirmacion) {
            try {
                const descRef = doc(db, "cupones", id);
                await deleteDoc(descRef);

                await fncDescLoad();
                console.log("Cupon eliminado.");
            } catch (error) {
                console.error("Error al eliminar el cupon:", error);
            }
        }
    };

    const sttUpdating = updatingDesc !== null;

    useEffect(() => {
        fncDescLoad();
    }, []);

    return (
        <div>
            <FormCupones datosDesc={datosDesc} fncUpdSnd={fncUpdSnd} fncDescChg={fncDescChg} />
            <ListCupones cupones={cupones} fncDescUpd={fncDescUpd} fncDescDel={fncDescDel} />
        </div>
    );
};

export default CuponesContainer;