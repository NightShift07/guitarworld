import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import UserLogin from './UserLogin';

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
        <>
            <UserLogin mail={mail} pass={pass} logUser={logUser} setMail={setMail} setPass={setPass}/>
        </>
    );
};

export default UserLoginContainer;