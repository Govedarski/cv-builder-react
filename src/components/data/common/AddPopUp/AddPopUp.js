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

    console.log(mark)
    return (
        <div id={"popUp"} className={styles.container}>
            {data?.map(x => item
                ({
                    className: (marked?.includes(x.id) && styles.mark) || "",
                    key: x.id,
                    data: x,
                    onClick: (e) => mark(e, section)
                })
            )}
            <button onClick={close}>Done</button>
        </div>
    )
}