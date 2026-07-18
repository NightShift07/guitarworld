import { useParams } from "react-router-dom";
import styles from './UserRegister.module.css';

function UserRegister({ error, fncSndReg, fncUpdChg, datosUserDb, datosUserAuth }) {
    return (
        <div className={styles.authContainer}>
            <div className={styles.contRegister}>
                <h2>Registrar usuario nuevo:</h2>
                <div className={styles.frmContainer}>
                    <form onSubmit={fncSndReg}>
                        <div className={styles.frmContainerCtl}>
                            <div className={styles.frmItem}>
                                <label htmlFor="nick" >Nombre de Usuario</label>
                                <input name="nick" type="text" value={datosUserDb.nick} onChange={fncUpdChg} required />
                            </div>
                            <div className={styles.frmItem}>
                                <label htmlFor="mail" >Correo Electrónico</label>
                                <input name="mail" type="email" value={datosUserAuth.mail} onChange={fncUpdChg} required />
                            </div>
                            <div className={styles.frmItem}>
                                <label htmlFor="pass" >Contraseña</label>
                                <input name="pass" type="password" value={datosUserAuth.pass} onChange={fncUpdChg} required placeholder="Mínimo 6 caracteres" />
                            </div>
                        </div>
                        {error && (<div className={styles.frmItemError}><p>{error}</p></div>)}
                        <div className={styles.cartContBotones}>
                            <button type="submit" className={styles.cartBoton} >Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;