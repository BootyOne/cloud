import styles from "./JokeHolder.module.css";
import React from "react";
import { TJoke } from "../../types/TJoke";
import Mark from "../Mark";

type ReviewHolderProps = {
    review: TJoke;
};
export const JokeHolder = ({ review }: ReviewHolderProps) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
            <div>Автор: <br/><span className={styles.user}>{review.userName}</span> </div>
            <span style={{textAlign: "start"}}>
                Как сильно смеялся автор: <Mark mark={review.mark} />
            </span>
            <div className={styles.joke}>
                Анекдот: <br/>{review.joke}
            </div>
            </div>
        </div>
    );
};