'use client'
import axios from 'axios';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { USER_TOKEN_KEY } from './register/page';
import React from 'react'

export default function Home() {
  const getAccountUrl = process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL + '/account';
  const token = localStorage.getItem(USER_TOKEN_KEY);
  const parsedToken = token ? JSON.parse(token) : null;
  const router = useRouter();

  const getAccount = async () => {
    if (!getAccountUrl) {
      return;
    }
    try {
      const res = await axios.get(getAccountUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${parsedToken}`
        },
      });
    } catch (error) {
      router.push('/register');
    }
  }

  useEffect(() => {
    getAccount();
  }, []);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SIMPLE SNS APP</h1>
      <div>ログイン済です。</div>
    </div>
  )
}
