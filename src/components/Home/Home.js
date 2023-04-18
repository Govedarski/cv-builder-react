import {useContext, useEffect, useState} from "react";
import * as cvService from "../../services/dataServices/cvService/cvService";
import {changeObjectKeysNaming, snakeCaseToCamelCase} from "../../utils/helper_functions";
import {CvItem} from "./CvItem/CvItem";
import styles from './Home.module.css'
import {LoadingContext} from "../../context/LoadingContext";

export function Home() {
    const [data, setData] = useState([]);
    const {setIsLoading} = useContext(LoadingContext);

    useEffect(() => {
setIsLoading(true);
        cvService.getAllCVs().then(
            (response) => {
                response = response.map(x => changeObjectKeysNaming(x, snakeCaseToCamelCase))
                setData(response)
                setIsLoading(false);
            }
        ).catch(
            (error) => {
                setIsLoading(false);
                console.log(error);
            }
        )
    }, [])
    return (
        <div className={styles.container}>
            {data.map(x => <CvItem
                key={x.id}
                data={x}
            />)}
        </div>
    )
}