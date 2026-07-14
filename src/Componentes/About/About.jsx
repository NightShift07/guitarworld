import styles from './About.module.css';

function About({ img, name, cargo, mail }) {
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <img src={img} alt={name}/>
            </div>
            <div>
                <p className={styles.pizq}>Nombre:</p>
                <p className={styles.name}>{name}</p>
                <p className={styles.pizq}>Cargo:</p>
                <p className={styles.cargo}>{cargo}</p>
                <p className={styles.pizq}>Correo:</p>
                <p className={styles.mail}>{mail}</p>
            </div>
        </div>
    );
}

export default About;