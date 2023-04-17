import React from "react";
import styles from "./AddPopUp.module.css";

export function AddPopUp({section, data, setAdd, mark, marked, item}) {


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
            <button onClick={close}>Done</button>
        </div>
    )
}