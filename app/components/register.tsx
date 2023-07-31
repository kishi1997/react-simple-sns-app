'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '../styles/register.module.css'
import axios from 'axios';
import {formData} from '../types/types';

const Register = () => {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<formData>({
        name: "",
        email: "",
        password: "",
    });
    const createAccountUrl = process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL + '/account';

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!createAccountUrl) {
            console.log("createAccountUrl is not defined");
            return;
        }
        try {
            const res = await axios.post(createAccountUrl, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Undifined error');
                console.log(error);
            } else {
                setError('Undifined error');
                console.log(error);
            }
            }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget;
        setFormData({ ...formData, [name]: value });
    }

    return (
        <>
            <div>ログイン済みの方はこちら</div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.form_container}>
                    <div>
                        <span className={styles.form_label_required}>必須</span>
                        <label htmlFor='name' className={styles.form_label_title}>アカウント名</label>
                        <input onChange={handleChange} value={formData.name} type="text" name="name" id="name" className={styles.form_input} placeholder='山田太郎' />
                    </div>
                    <div>
                        <span className={styles.form_label_required}>必須</span>
                        <label htmlFor='email' className={styles.form_label_title}>メールアドレス</label>
                        <input onChange={handleChange} value={formData.email} type="email" name="email" id="email" className={styles.form_input} placeholder='test@gmail.com' />
                    </div>
                    <div>
                        <span className={styles.form_label_required}>必須</span>
                        <label htmlFor='password' className={styles.form_label_title}>パスワード</label>
                        <input onChange={handleChange} value={formData.password} type="password" name="password" id="password" autoComplete='cuurent-password' className={styles.form_input} placeholder='pass0000' />
                    </div>
                </div>
                <div className={styles.form_btn}><button type="submit">登録する</button></div>
            </form>
        </>
    )
}

export default Register