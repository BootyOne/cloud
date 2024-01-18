import styles from './JokeTable.module.css'
import React from "react";
import {TJoke} from "../../types/TJoke";
import JokeHolder from "../JokeHolder";

export type ReviewTableProps = {
    reviewList: TJoke[];
}
export const JokeTable = ({reviewList}: ReviewTableProps) => {
    let n = 0;
    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                {reviewList?.map((review) =>
                    <div key={n++}>
                        <JokeHolder review={review}/>
                    </div>)}
            </div>
        </div>
    );
};