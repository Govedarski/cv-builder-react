import React from "react";
import styles from "./AddPopUp.module.css";
import {routes} from '../../../../constants/routes.js';
import {Link} from 'react-router-dom';

export function AddPopUp({section, data, setAdd, mark, marked, item, state}) {


    function close() {
        setAdd(prevState => {
            const newState = {...prevState};
            newState[section] = false;
            return newState;
        });
    }

    if(section === "requirements") {
        marked = [marked]
    }

    return (
        <div id={"popUp"} className={styles.container}>
            {data?.map(x => (<div key={x.id}>{item
                ({
                    className: (marked?.includes(x.id) && styles.mark) || "",
                    key: x.id,
                    data: x,
                    onClick: (e) => mark(e, section)
                })}
                </div>)
            )}
            <div>
                {/*<Link*/}
                {/*    to={routes[section.toUpperCase() + "_CREATE"]}*/}
                {/*    state={{backData: state}}*/}
                {/*>*/}
                {/*    Create new {section}*/}
                {/*</Link>*/}
                <button onClick={close}>Done</button>
            </div>
        </div>
    )
}