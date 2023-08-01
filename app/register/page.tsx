'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from './page.module.css'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import { userDataState } from '../atom/state/userDataState';

const Register = () => {
    const router = useRouter();

    const [error, setError] = useState("");

    const [name, setName] = useState<string>("");
    const [isNameValid, setIsNameValid] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

    const [password, setPassword] = useState<string>("");
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);

    const [userData, setUserData] = useRecoilState(userDataState);

    const [errorDialogOpen, setErrorDialogOpen] = useState(false);

    const createAccountUrl = process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL + '/account';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!createAccountUrl) {
            console.log("createAccountUrl is not defined");
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
            const data = res.data;
            setUserData(data);
            if(res.status === 200) {
                router.push('/');
            } else {
                alert(error);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Undifined error');
                setErrorDialogOpen(true);
            } else {
                setError('Undifined error');
                console.log(error);
            }
        }
    }

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
        setIsNameValid(e.target.value.length > 0);
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsEmailValid(e.target.value != '' && emailPattern.test(e.target.value));
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setIsPasswordValid(e.target.value.length >= 8);
    }

    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    }

    const isFormValid = isNameValid && isPasswordValid && isEmailValid;

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
                <div className={styles.form_btn}><button className={isFormValid ? '' : styles.disabled} type="submit" disabled={!isFormValid}>登録する</button></div>
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

export default Register