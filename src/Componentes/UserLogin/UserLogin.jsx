import { useParams, Link } from "react-router-dom";
import styles from './UserLogin.module.css';

function UserLogin({ mail, pass, logUser, setMail, setPass }) {
    return (
        <div className={styles.authContainer}>
            <div className={styles.contLogin}>
                <h2>Iniciar Sesión</h2>
                <div className={styles.frmContainer}>
                    <form onSubmit={logUser}>
                        <div className={styles.frmContainerCtl}>
                            <div className={styles.frmItem}>
                                <label htmlFor="mail">Correo electronico</label>
                                <input name="mail" type="email" placeholder="Correo electrónico" value={mail} onChange={(e) => setMail(e.target.value)} />
                            </div>
                            <div className={styles.frmItem}>
                                <label htmlFor="pass">Contraseña</label>
                                <input name="pass" type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} />
                            </div>
                        </div>
                        <div className={styles.cartContBotones}>
                            <button type="submit" className={styles.cartBoton} >Ingresar</button>
                        </div>
                    </form>
                    <div className={styles.lnkRegister} >
                        <p>¿No tenés una cuenta?</p>
                        <p><Link to="/register">Registrate aquí</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;