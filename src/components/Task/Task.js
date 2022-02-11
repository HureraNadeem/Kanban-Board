import React from 'react';
import styles from "./task.module.css";

function Task(props) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.svg_div}>
                    <svg fontSize={"20px"} stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M15,5 L17,5 L17,3 L15,3 L15,5 Z M7,5 L9,5 L9,3 L7,3 L7,5 Z M15,13 L17,13 L17,11 L15,11 L15,13 Z M7,13 L9,13 L9,11 L7,11 L7,13 Z M15,21 L17,21 L17,19 L15,19 L15,21 Z M7,21 L9,21 L9,19 L7,19 L7,21 Z"></path></svg>
                </div>
                <div className={styles.task_data}>
                    <p id={styles.heading}>{props.id}</p>
                    <p id={styles.content}>{props.title}</p>
                </div>
            </div>





        </>
    );
}

export default Task;