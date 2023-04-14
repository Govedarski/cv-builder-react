import styles from "./AsideMenu.module.css";
import {Arrow} from "../Arrow/Arrow";
import {useState} from "react";
import {Link} from "react-router-dom";

export function AsideMenu({links}) {
    const [isAsideOpen, setIsAsideOpen] = useState(true);


    function toggleAsideMenuHandler() {
        setIsAsideOpen(prevState => !prevState);
    }

    return (
        <aside className={styles.asideMenu}
               style={{width: isAsideOpen ? '20%' : '50px'}}
        >
            {isAsideOpen &&
                <ul>
                    {links.map(({name, link}) => {
                        return (
                            <li key={name}>
                                {link === "back"
                                    ? <Link to="#" onClick={() => window.history.back()}>{name}</Link>
                                    : <Link to={link}>{name}</Link>
                                }
                            </li>)
                    })}
                </ul>
            }
            <Arrow
                className={isAsideOpen ? styles.arrowLeft : styles.arrowRight}
                onClick={toggleAsideMenuHandler}
            />
        </aside>
    )
}