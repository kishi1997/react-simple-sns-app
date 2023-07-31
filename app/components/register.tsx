'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import styles from '../styles/register.module.css'
import { useRecoilState } from 'recoil';
import { formDataState } from '../atom/state/formDataState';
import axios, { AxiosError } from 'axios';

const Register = () => {
    // エラーメッセージの状態管理
    const [error, setError] = useState("");
    // フォームデータの状態管理
    const [formData, setFormData] = useRecoilState(formDataState);
    // アカウント登録のエンドポイントを取得
    const endPoint = process.env.NEXT_PUBLIC_CREATE_ACCOUNT_URL;
    // 登録処理
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // エンドポイントが.envにちゃんとある場合に、処理を行う
        if (endPoint) {
            try {
                const res = await axios.post(endPoint, {
                    // postmanでやったやり方と同じ
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = res.data;
                console.log(data);
            } catch (error) { 
                // エラーハンドリング
                if (axios.isAxiosError(error)) {
                  // エラーレスポンスがある場合
                  setError(error.response?.data?.message || 'Undifined error');
                  console.log(error);
                } else {
                  // エラーレスポンスがない場合
                  setError('Undifined error');
                  console.log(error);
                }
              }
            // DB内に登録されたdata取り出し
            // const data = await res.json();
            // if (data) {
            //     console.log(data);
            // }
            // else {
            //     setError(data.message);
            //     console.log(error);
            // }
        }
    }
    // 入力されたデータをformDataに格納
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 入力されているinputのname、valueを取り出す
        const { name, value } = e.currentTarget;
        // setFormDataにセット
        setFormData({ ...formData, [name]: value });
        //[]で囲う理由
        //nameが"email"の場合は、[name]: valueはemail: valueとなり、
        //formDataオブジェクトのemailプロパティが更新される。
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