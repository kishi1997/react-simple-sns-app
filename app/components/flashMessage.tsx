import React, { useEffect } from "react";
import styles from '../styles/flashMessage.module.css'
import { useRecoilValue, useSetRecoilState } from "recoil";
import { flashMessageState } from "../atom/state/flashMessageState";

export const FlashMessage = () => {
    const flashMessage = useRecoilValue(flashMessageState);
    const setFlashMessage = useSetRecoilState(flashMessageState);
    useEffect(() => {
        if (flashMessage && flashMessage.length > 0) {
            setTimeout(() => {
                setFlashMessage("");
            }, 3000);
        }
    }, [flashMessage]);

    return (
        <>
            {flashMessage && flashMessage.length > 0 && (
                <div className={styles.flashMessage}>
                    {flashMessage}
                </div>
            )}
        </>
    )
};
