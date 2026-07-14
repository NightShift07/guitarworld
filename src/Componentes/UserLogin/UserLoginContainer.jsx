import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const UserLoginContainer = () => {

    const [mail, setMail] = useState("");
    const [pass, setPass] = useState("");

    const navigate = useNavigate();

    const logUser = (e) => {
        e.preventDefault();

        const auth = getAuth();

        signInWithEmailAndPassword(auth, mail, pass)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/');
            })
            .catch((error) => {
                const errorCod = error.code;
                const errorMsg = error.message;
                console.error("Error en el login:", errorCod, errorMsg);
                alert("Error: " + errorMsg);
            });
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={logUser}>
                <input type="email" placeholder="Correo electrónico" value={mail} onChange={(e) => setMail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} />
                <button type="submit">Ingresar</button>
            </form>
            <br />
            <p>¿No tenés una cuenta? <Link to="/register">Registrate aquí</Link></p>
        </div>
    );
};

export default UserLoginContainer;