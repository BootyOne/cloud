import React, { useState } from "react";
import { Button, Modal, Input, Textarea } from "@skbkontur/react-ui";
import styles from "./NewJoke.module.css";
import { TJoke } from "../../types/TJoke";
import axios from "axios";
import {BACKEND_URL} from "../../constants";

type NewJokeProps = {
    opened: boolean;
    close: () => void;
    crutch: boolean;
    setCrutch: (value: boolean) => void;
};

export const NewJoke = ({ opened, close, setCrutch, crutch }: NewJokeProps) => {
    const [name, setName] = useState("");
    const [mark, setMark] = useState(0);
    const [joke, setJoke] = useState("");

    async function makeAnswer() {
        const newReview: TJoke = {
            userName: name.replace(/ /g,'') === "" ? "Аноним": name,
            mark: mark,
            joke: joke.replace(/ /g,'') === "" ? "Забыл написать анекдот ;(": joke,
        };
        await axios.post<TJoke>(`${BACKEND_URL}jokes/jokes?Name=${newReview.userName}&Joke=${newReview.joke}&Mark=${newReview.mark}`)
        setCrutch(!crutch);
        setName("");
        setMark(0);
        setJoke("");
    };

    return (
        <>
            {opened && (
                <Modal width={"120%"} onClose={close}>
                    <Modal.Header>
                        Добавить анекдот
                    </Modal.Header>
                    <Modal.Body>
                        <div className={styles.form}>
                            <label className={styles.label}>
                                <span>Автор:</span>
                                <Input
                                    className={styles.input}
                                    type={"text"}
                                    placeholder={"Введите имя"}
                                    onValueChange={setName}
                                />
                            </label>
                            <label className={styles.label}>
                                <span>Как сильно смеялись:</span>
                                <div className={styles.rateArea}>
                                    <input
                                        type="radio"
                                        id="star-5"
                                        name="rating"
                                        value="5"
                                        onClick={(value) =>
                                            setMark(Number(value.currentTarget.value))
                                        }
                                    />
                                    <label htmlFor="star-5" title="Оценка «5»" />
                                    <input
                                        type="radio"
                                        id="star-4"
                                        name="rating"
                                        value="4"
                                        onClick={(value) =>
                                            setMark(Number(value.currentTarget.value))
                                        }
                                    />
                                    <label htmlFor="star-4" title="Оценка «4»" />
                                    <input
                                        type="radio"
                                        id="star-3"
                                        name="rating"
                                        value="3"
                                        onClick={(value) =>
                                            setMark(Number(value.currentTarget.value))
                                        }
                                    />
                                    <label htmlFor="star-3" title="Оценка «3»" />
                                    <input
                                        type="radio"
                                        id="star-2"
                                        name="rating"
                                        value="2"
                                        onClick={(value) =>
                                            setMark(Number(value.currentTarget.value))
                                        }
                                    />
                                    <label htmlFor="star-2" title="Оценка «2»" />
                                    <input
                                        type="radio"
                                        id="star-1"
                                        name="rating"
                                        value="1"
                                        onClick={(value) =>
                                            setMark(Number(value.currentTarget.value))
                                        }
                                    />
                                    <label htmlFor="star-1" title="Оценка «1»" />
                                </div>
                            </label>
                            <label className={styles.label}>
                                <span>Добавить анекдот:</span>
                                <Textarea
                                    className={styles.input}
                                    width={"75%"}
                                    placeholder={"Введите анекдот"}
                                    onValueChange={setJoke}
                                />
                            </label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <div className={styles.modalButtons}>
                            <Button
                                className={styles.button}
                                use="primary"
                                onClick={() => {
                                    makeAnswer();
                                    close();
                                }}
                            >
                                Добавить
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};