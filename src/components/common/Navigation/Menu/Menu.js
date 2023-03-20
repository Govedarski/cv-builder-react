import {Link} from 'react-router-dom';
import styles from './Menu.module.css';
import {useContext, useState} from 'react';
import {Arrow} from '../../../helpers/Arrow/Arrow.js';
import arrowStyles from '../../../helpers/Arrow/Arrow.module.css';
import {AuthContext} from '../../../../context/AuthContext.js';

export function Menu({hideMenuHandler}) {
    const {isAuthenticated} = useContext(AuthContext);
    let [hide, setHide] = useState(false);

    const fadeHandler = (e) => {
        if (e.target.tagName === 'UL') {
            return;
        }
        setHide(true);
    };
    const hideMenuClass = hide ? styles.fade : '';
    return (
        <div
            className={`${styles.content}  ${hideMenuClass}`}
            onAnimationEnd={hideMenuHandler}
        >

            <ul
                onClick={fadeHandler}
                className={styles.navList}>
                <li className={styles.navListItem}>
                    <Link href="src/components/common/Navigation/Menu#">Profile</Link></li>
                {!isAuthenticated &&
                    <>
                        <li className={styles.navListItem}>
                            <Link to={'/register'}>Register</Link>
                        </li>
                        <li className={styles.navListItem}>
                            <Link to={'/login'}>Login</Link>
                        </li>
                    </>
                }
                {isAuthenticated &&
                <li className={styles.navListItem}>
                    <Link to={"/logout"}>Logout</Link>
                </li>
                }
                <li className={styles.closeBtn}>
                    <Arrow
                        directionClass={arrowStyles.up}
                    />
                </li>
            </ul>
            <div>
            </div>
        </div>

    );
}

