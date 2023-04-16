import styles from './ListTemplate.module.css'
import {Link} from "react-router-dom";
import {AsideMenu} from "../../../helpers/AsideMenu/AsideMenu";

export function ListTemplate({title, data, createLink}) {
    const asideLinks = [
        {name: 'CV', link: '/cv'},
        {name: 'Work Experience', link: '/work-experience'},
        {name: 'Educations', link: '/education'},
        {name: 'References', link: '/references'},
        {name: 'Certificates', link: '/certificates '},
        {name: 'Requirements', link: '/requirements'},
    ]
    return (
        <div className={styles.container}>
            <AsideMenu links={asideLinks}/>
            <section className={styles.mainContent}>
                <h1>{title}</h1>
                <Link className={styles.createBtn}
                      to={createLink}
                >
                    Create new
                </Link>
                <ul>
                    {data}
                </ul>
            </section>
        </div>
    );
}