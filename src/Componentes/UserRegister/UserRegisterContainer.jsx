import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config';

const UserRegisterContainer = () => {
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();
    
    const auth = getAuth();
    
    
    const initUserAuth = {
            mail: '',
            pass: ''
        };
    
        const [datosUserAuth, setDatosUserAuth] = useState(initUserAuth);
        const [carga, setCarga] = useState(false);
        const [datosUserDb, setDatosUserDb] = useState({nick: '', nivel: 'user' });    
        
        const fncUpdChg = (evento) => {
            const { name, value } = evento.target;
            if(name === 'nick'){
                setDatosUserDb({ ...datosUserDb, [name]: value });
            } else {
                setDatosUserAuth({ ...datosUserAuth, [name]: value });
            }
        };
        
    
    const fncSndReg = async (e) => {
        e.preventDefault();
        setCarga(true);
        setError(null);
        
        try {
            const logNewUsr = await createUserWithEmailAndPassword(auth, datosUserAuth.mail, datosUserAuth.pass);
            const newUserDb = { ...datosUserDb, mail: datosUserAuth.mail };
            setDatosUserDb(newUserDb);

            const uidNewUsr = logNewUsr.user.uid;

            try{
                await setDoc(doc(db, "users", uidNewUsr), datosUserDb);
                console.log("Usuario registrado correctamente");
            } catch (error) {
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error("Error en el registro:", error.message);
            }

            setCarga(false);
            navigate('/');

        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                const confirmYes = window.confirm(
                    'Este correo electrónico ya está registrado. ¿Desea iniciar sesión?'
                );
                if (confirmYes) {
                    navigate('/login');
                } else {
                    navigate('.');
                }
            } else {
                setError('Ocurrió un error al registrar el usuario. Verifique los datos e intente nuevamente.');
                console.error("Error en el registro:", error.message);
            }
        }
    };

    return (
        <div className="auth-container">
            <h2>Crear una nueva cuenta</h2>
            <form onSubmit={fncSndReg}>
                <div className="form-group">
                    <label>Nombre de Usuario</label>
                    <input name="nick" type="text" value={datosUserDb.nick} onChange={fncUpdChg} required />
                </div>
                <div className="form-group">
                    <label>Correo Electrónico</label>
                    <input name="mail" type="email" value={datosUserAuth.mail} onChange={fncUpdChg} required />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input name="pass" type="password" value={datosUserAuth.pass} onChange={fncUpdChg} required placeholder="Mínimo 6 caracteres" />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};
export default UserRegisterContainer;