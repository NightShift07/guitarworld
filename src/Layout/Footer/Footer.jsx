import styles from './Footer.module.css';

function Footer() {
    return(
        <footer className={styles.footer}>
            <div className={styles.pie}>
                <p>Desarrollado por <a href="https://github.com/NightShift07">NightShift07</a></p>
                <p>Todos los derechos reservados. &copy; 2026</p>
            </div>
        </footer>
    )
}

export default Footer;