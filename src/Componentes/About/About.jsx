import styles from './About.module.css';

export function About({ img, name, cargo, mail }) {
    return (
        <div className={styles.perfContainer}>
            <div className={styles.image}>
                <img src={img} alt={name} />
            </div>
            <div>
                <p className={styles.pIzq}>Nombre:</p>
                <p className={styles.name}>{name}</p>
                <p className={styles.pIzq}>Cargo:</p>
                <p className={styles.cargo}>{cargo}</p>
                <p className={styles.pIzq}>Correo:</p>
                <p className={styles.mail}>{mail}</p>
            </div>
        </div>
    );
};

export function AboutCarga() {
    return (
        <div className={styles.container}>
            <p>Cargando perfiles del equipo...</p>
            <p>Por favor, aguarde un momento...</p>
        </div>
    );
};