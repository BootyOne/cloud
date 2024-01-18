import styles from "./InfoPanel.module.css";
import { TJoke } from "../../types/TJoke";
import React, {useEffect, useState} from "react";
import NewJoke from "../NewJoke";
import { Button } from "@skbkontur/react-ui";

type InfoPanelProps = {
    reviewList: TJoke[];
    setCrutch: (value: boolean) => void;
    crutch: boolean;
};

export const InfoPanel = ({ reviewList, setCrutch, crutch }: InfoPanelProps) => {
    const [opened, setOpened] = useState(false);
    const [mark, setMark] = useState<number | string>(0);

    useEffect(() => {
        let averageRating = reviewList.length !==0 ?(
            reviewList.reduce((sum, val) => sum + val.mark, 0) / reviewList.length
        ).toFixed(2) : 0;

        setMark(averageRating)
    }, [reviewList])
    const openModal = () => {
        setOpened(true);
    }

    const closeModal = () => {
        setOpened(false);
    }

    return (
        <div className={styles.holder}>
            <div className={styles.wrapper}>
            <NewJoke opened={opened} close={closeModal} setCrutch={setCrutch} crutch={crutch}/>
            <Button use="primary" onClick={()=>openModal()}>+добавить анекдот</Button>
            <div className={styles.mark}>Средняя оценка анекдотов комьюнити: {mark}</div>
            </div>
        </div>
    );
};