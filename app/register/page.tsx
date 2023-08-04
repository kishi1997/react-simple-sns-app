'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
export const USER_TOKEN_KEY = "userToken";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorDialogOpen, setErrorDialogOpen] = useState(false);
    const createAccountUrl = process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL + '/account';
    
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const validateEmail = (email:string): boolean => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!createAccountUrl) {
            return;
        }
        try {
            const res = await axios.post(createAccountUrl, {
                name: name,
                email: email,
                password: password,
            }, {
                headers: {
                 "Content-Type": "application/json",
                },
            });
            const token = res.data.token;
            // const USER_TOKEN_KEY = "userToken";
            localStorage.setItem(USER_TOKEN_KEY, JSON.stringify(token));
            router.push('/');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Undifined error');
                setErrorDialogOpen(true);
            } else {
                setError('Undifined error');
                setErrorDialogOpen(true);
            }
        }
    }

    const isFormValid = name.length > 0 && email.length > 0 && validateEmail(email) && password.length >= 8;


    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>SIMPLE SNS APP</h1>
            <div>ログイン済みの方はこちら</div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form_container}>
                    <div>
                        <span className={styles.form_label_required}>必須</span>
                        <label htmlFor='name' className={styles.form_label_title}>アカウント名</label>
                        <input onChange={handleNameChange} value={name} type="text" name="name" id="name" className={styles.form_input} placeholder='山田太郎' />
                    </div>
                    <div>
                        <span className={styles.form_label_required}>必須</span>
                        <label htmlFor='email' className={styles.form_label_title}>メールアドレス</label>
                        <input onChange={handleEmailChange} value={email} type="email" name="email" id="email" className={styles.form_input} placeholder='test@gmail.com' />
                    </div>
                    <div>
                        <span className={styles.form_label_required}>必須</span>
                        <label htmlFor='password' className={styles.form_label_title}>パスワード</label>
                        <input onChange={handlePasswordChange} value={password} type="password" name="password" id="password" autoComplete='cuurent-password' className={styles.form_input} placeholder='pass0000' />
                    </div>
                </div>
                <div className={styles.form_btn}>
                    <button className={isFormValid ? '' : styles.disabled} type="submit" disabled={!isFormValid}>登録する</button>
                </div>
            </form>

            {errorDialogOpen && (
                <div className={styles.dialog}>
                    <div>登録エラーが発生しました。</div>
                    <div>{error}</div>
                    <button onClick={handleCloseErrorDialog}>閉じる</button>
                </div>
            )}
        </div>
    )
}