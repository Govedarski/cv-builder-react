import redLogo from './redLogo.png';
import blueLogo from './blueLogo.png';
import styles from './Navigation.module.css';
import {Link, useLocation} from 'react-router-dom';
import {Menu} from './Menu/Menu.js';
import {useState} from 'react';
import {Arrow} from '../../helpers/Arrow/Arrow.js';

export function Navigation() {
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);

    const showMenuHandler = () => {
        setShowMenu(true);
    };

    const hideMenuHandler = (e) => {
        if (!e.target.className.includes('fade')) {
            return;
        }
        setShowMenu(false);
    };


    return (
        <nav className={styles.siteNav}>
            <Link to="/" className={styles.logoLink + " " + styles.leftLink}>
                <img src={blueLogo} alt="Logo"/>
                <span className={styles.linkSpan}>-LINK</span>
            </Link>
            {showMenu
                ? <Menu hideMenuHandler={hideMenuHandler}/>
                : <Arrow onClick={showMenuHandler}>Menu</Arrow>}

            <Link to="/" className={styles.logoLink + " " + styles.rightLink}>
                <img src={redLogo} alt="Logo"/>
                <span className={styles.linkSpan}>-LINK</span>
                <span className={styles.recruiterSpan}>Recruiter</span>
            </Link>
        </nav>
    );
}