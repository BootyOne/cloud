import React from "react";
import styles from "./Mark.module.css";

export type MarkProps = {
    mark: number;
};

export const Mark = ({ mark }: MarkProps) => {
    return (
        <div className={styles.ratingResult}>
            {mark > 0 ? <span className={styles.active} /> : <span />}
            {mark > 1 ? <span className={styles.active} /> : <span />}
            {mark > 2 ? <span className={styles.active} /> : <span />}
            {mark > 3 ? <span className={styles.active} /> : <span />}
            {mark > 4 ? <span className={styles.active} /> : <span />}
        </div>
    );
};