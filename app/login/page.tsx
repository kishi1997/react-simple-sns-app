'use client'
import React, { ChangeEvent, useState} from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { apiRequest } from '../axios/axiosInstance';
import { validateEmail } from '../validation/email';
import { setToken } from '../storage/storage';
import { AsyncButton } from '../components/asyncButton';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleLogin = async () => {
        apiRequest.post('./auth', {
            email: email,
            password: password
        })
            .then((response) => {
                const data = response.data;
                setToken(data.token);
                router.push('/')
            })
            .catch((error) => {
                setErrorDialogOpen(true);
                setError(error.data.message);
            })
    }

    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    }

    const isFormValid = email.length > 0 && validateEmail(email) && password.length >= 8;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>SIMPLE SNS APP</h1>
            <Link href="../register">新規登録の方はこちら</Link>
            <form className={styles.form} onSubmit={handleLogin}>
                <div className={styles.form_container}>
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
                    <AsyncButton onClick={handleLogin} isDisabled={!isFormValid}>
                        ログインする
                    </AsyncButton>
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

export default Login