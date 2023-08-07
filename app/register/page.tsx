'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { setToken } from '../storage/storage';
import { instance, useAxiosInterceptors } from '../axios/axiosInstance';
import ErrorDialog from '../components/errorDialog';


export default function Register() {
    useAxiosInterceptors();
    const router = useRouter();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const createAccountUrl = process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL + '/account';

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const validateEmail = (email: string): boolean => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        instance.post(createAccountUrl, {
                name: name,
                email: email,
                password: password,
            })
            .then((response) => {
                const token = response.data.token;
                setToken(token);
                router.push('/');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const isFormValid = name.length > 0 && email.length > 0 && validateEmail(email) && password.length >= 8;

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

            <ErrorDialog />
        </div>
    )
}