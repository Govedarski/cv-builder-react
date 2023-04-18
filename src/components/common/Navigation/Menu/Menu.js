import {Link} from 'react-router-dom';
import styles from './Menu.module.css';
import {useContext, useState} from 'react';
import {Arrow} from '../../../helpers/Arrow/Arrow.js';
import arrowStyles from '../../../helpers/Arrow/Arrow.module.css';
import {UserContext} from '../../../../context/UserContext.js';
import {routes} from '../../../../constants/routes.js';
import {Logout} from "../../../authentication/Logout/Logout";

export function Menu({hideMenuHandler}) {
    const {isAuthenticated, userData} = useContext(UserContext);
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
                {!isAuthenticated &&
                    <>
                        <li className={styles.navListItem}>
                            <Link to={routes.REGISTER}>Register</Link>
                        </li>
                        <li className={styles.navListItem}>
                            <Link to={routes.LOGIN}>Login</Link>
                        </li>
                    </>
                }
                {isAuthenticated &&
                    <>
                        <li className={styles.navListItem}>
                            <Link to={routes.CV_LIST}>My data</Link>
                        </li>
                        <li className={styles.navListItem}>
                            <Link to={routes.PROFILE_OWN}>Profile</Link>
                        </li>
                        <li className={styles.navListItem}>
                            <Logout/>
                        </li>
                    </>
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

