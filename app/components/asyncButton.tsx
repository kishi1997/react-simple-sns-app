'use client'
import { MouseEventHandler, useState } from "react";
import styles from '../styles/asyncButton.module.css'

type asyncButtonProps = {
    onClick: () => Promise<void>;
    isDisabled: boolean;
    children: React.ReactNode;
}

export const AsyncButton = ({ onClick, children, isDisabled }: asyncButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await onClick();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.form_btn}>
            <button type="button" onClick={handleClick} disabled={isLoading || isDisabled}>
                {children}
            </button>
        </div>
    );
};