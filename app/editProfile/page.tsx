'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { apiRequest } from '../axios/axiosInstance';
import { AsyncButton } from '../components/asyncButton';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { userDataState } from '../atom/state/userDataState';
import { flashMessageState } from '../atom/state/flashMessageState';
import { ErrorDialog } from '../components/errorDialog';
import { errorDialogOpenState } from '../atom/state/errorDialogOpenState';

export default function EditProfile() {
    const router = useRouter();
    const userData = useRecoilValue(userDataState);
    const [name, setName] = useState<string>("");
    const [newIconImageUrl, setNewIconImageUrl] = useState<File>();
    const [error, setError] = useState<string>("");
    const [errorDialogOpen, setErrorDialogOpen] = useRecoilState(errorDialogOpenState);
    const setFlashMessage = useSetRecoilState(flashMessageState);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleIconChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewIconImageUrl(e.target.files[0]);
        }
    };

    const editInfo = async () => {
        const newUserData = JSON.stringify({
            "name": name,
            "email": userData?.email
        });
        try {
            await apiRequest.patch('/account/profile', newUserData)
            if (newIconImageUrl) {
                const newIcon = new FormData();
                newIcon.append('file', newIconImageUrl);
                await apiRequest.patch('/account/icon_image', newIcon, {
                    headers: {
                        "content-type": "multipart/form-data"
                    }
                })
            }
            router.push('../mypage');
            setFlashMessage("変更が完了しました。");
        }
        catch (error:any) {
            setError(error.message);
            setErrorDialogOpen(true);
        }
    };

    const isFormValid = name.length > 0;

    useEffect(() => {
        if (userData) {
            setName(userData.name);
        }
    }, [userData]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>EDIT MY PROFILE</h1>
            <form className={styles.form} onSubmit={editInfo}>
                <div className={styles.form_container}>
                    <div>
                        <label htmlFor='file' className={styles.form_label_title}>新しいアイコンを選択する</label>
                        <input onChange={handleIconChange} type="file" name="file" id="file" className={styles.form_input} />
                    </div>
                    <div>
                        <label htmlFor='name' className={styles.form_label_title}>アカウント名</label>
                        <input onChange={handleNameChange} value={name} type="text" name="name" id="name" className={styles.form_input} placeholder='山田太郎' />
                    </div>
                </div>
                <AsyncButton onClick={editInfo} isDisabled={!isFormValid}>
                    変更する
                </AsyncButton>
            </form>
            <ErrorDialog errorDialogOpen={errorDialogOpen} error={error}/>
        </div>
    )
}