import styles from './Header.module.css';
import Nav from './Nav';

function Header() {
    return(
        <header className={styles.header}>
            <div>
                <Nav />
            </div>
        </header>
    )
}

export default Header;