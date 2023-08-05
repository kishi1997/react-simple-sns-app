'use client'
import React from 'react'
import axios from 'axios';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { parsedToken } from './storage/storage';

export default function Home() {
  const getAccountUrl = process.env.NEXT_PUBLIC_ENDPOINT_BASIC_URL + '/account';
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
