import React, { useState, useEffect } from "react";
import styles from '../styles/flashMessage.module.css'

export const FLASH_MESSAGE = "flashMessage";

export function setSessionFlashMessage(e: string) {
    sessionStorage.setItem(FLASH_MESSAGE, e);
}

export const FlashMessage = () => {
    const [flashMessage, setFlashMessage] = useState<string>("");
    useEffect(() => {
        const message = sessionStorage.getItem(FLASH_MESSAGE);
        if (message && message.length > 0) {
            setFlashMessage(message);
            setTimeout(() => {
                setFlashMessage("");
                sessionStorage.removeItem(FLASH_MESSAGE);
            }, 3000);
        }
    }, []);

    return (
        <div className={styles.flashMessage} style={{ display: flashMessage ? "block" : "none" }}>
            {flashMessage}
        </div>
    )
};
