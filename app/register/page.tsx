'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setToken } from '../storage/tokenStorage';
import { validateEmail } from '../utils/validateUtils/emailUtils';
import { AsyncButton } from '../components/asyncButton';
import { ErrorDialog } from '../components/errorDialog';
import { useRecoilState } from 'recoil';
import { errorDialogOpenState } from '../atom/state/errorDialogOpenState';
import { userFactory } from '../models/user_model';

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState<string>("");
    const [errorDialogOpen, setErrorDialogOpen] = useRecoilState(errorDialogOpenState);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async () => {
        const params = {
            name: name,
            email: email,
            password: password,
        }
        try {
            const response = await userFactory().register(params);
            setToken(response.token);
            router.push('/');
        }
        catch(error: any) {
            setError(error.message);
            setErrorDialogOpen(true);
        }
    }

    const isFormValid = name.length > 0 && email.length > 0 && validateEmail(email) && password.length >= 8;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>SIMPLE SNS APP</h1>
            <Link href={'../login'}>ログインはこちら</Link>
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
                <AsyncButton onClick={handleSubmit} isDisabled={!isFormValid}>
                    登録する
                </AsyncButton>
            </form>
            <ErrorDialog errorDialogOpen={errorDialogOpen} error={error}/>
        </div>
    )
}