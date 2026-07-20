import ArticulosContainer from '../Articulos/ArticulosContainer';
import CuponesContainer from '../Cupones/CuponesContainer';

import styles from './ControlPanel.module.css';

function ControlPanel() {
    return (
        <>
            <div className={styles.cpContainer}>
                <ArticulosContainer />
                <CuponesContainer />
            </div>
        </>
    )
};

export default ControlPanel;