import React, {useEffect, useState} from "react";
import styles from './MainPage.module.css';
import axios, {AxiosResponse} from 'axios';
import {TJoke} from "../../types/TJoke";
import packageInfo from "../../../package.json";
import InfoPanel from "../../components/InfoPanel";
import JokeTable from "../../components/JokeTable";
import {BACKEND_URL} from "../../constants";

export const MainPage = () => {
    let start: TJoke[] = [];
    let [data, setData] = useState<TJoke[]>(start);
    let [crutch, setCrutch] = useState(false);
    const [versionBack, setVersionBack] = useState("Unknown");
    const [replica, setReplica] = useState("Unknown");

    useEffect(() => {
        async function getGroups() {
            return await axios.get<TJoke>(`${BACKEND_URL}jokes`).then((resp: AxiosResponse) => {
                return resp.data
            })
        }

        getGroups().then(resp => setData(resp));
    }, [crutch])

    useEffect(()=> {
        async function getBackVersion() {
            return await axios.get(`${BACKEND_URL}info/version`).then((resp: AxiosResponse) => {
                return resp.data;
            })
        }

        async function getHost() {
            return await axios.get<string>(`${BACKEND_URL}info/host`).then((resp: AxiosResponse) => {
                return resp.data;
            })
        }

        getBackVersion().then(resp => setVersionBack(resp))
        getHost().then(resp => setReplica(resp));
    }, [])

    useEffect(() => {
        setData(data);
    }, [data]);
    return (
        <>
            <InfoPanel reviewList={data} setCrutch={setCrutch} crutch={crutch} />
            <JokeTable reviewList={data} />
            <div className={styles.version}>
                Версия фронта: {packageInfo.version}<br/>
                Версия бэка: {versionBack}<br/>
                Реплика: {replica}
            </div>
        </>
    );
}