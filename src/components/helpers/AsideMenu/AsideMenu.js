import styles from './AsideMenu.module.css';
import {Arrow} from '../Arrow/Arrow';
import {useState} from 'react';
import {Link} from 'react-router-dom';

export function AsideMenu({links}) {
    const [isAsideOpen, setIsAsideOpen] = useState(true);


    function toggleAsideMenuHandler() {
        setIsAsideOpen(prevState => !prevState);
    }

    links = links.map(link => {
            switch (link.name) {
                case 'Back':
                    return <li key={link.name}><Link to="#" onClick={() => window.history.back()}>{link.name}</Link></li>;
                case 'Delete':
                    return <li key={link.name}><Link to="#" onClick={link.link}>{link.name}</Link></li>;
                default:
                    return <li key={link.name}><Link to={link.link}>{link.name}</Link></li>;
            }
        }
    );


    return (
        <aside className={styles.asideMenu}
               style={isAsideOpen
                   ? {}
                   : {
                       width: '50px',
                       backgroundColor: 'rgba(0, 0, 0, 0)',
                       border: 'none'
                   }}
        >
            {isAsideOpen &&
                <ul>
                    {links}
                </ul>
            }
            <Arrow
                className={isAsideOpen ? styles.arrowLeft : styles.arrowRight}
                onClick={toggleAsideMenuHandler}
            />
        </aside>
    );
}