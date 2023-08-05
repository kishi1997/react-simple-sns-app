'use client'
import React from 'react'
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { instance } from './axios/axiosInstance';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    instance.get('/account')
      .then(response => {
        return response;
      })
      .catch(error => {
        router.push('/register');
      })
  }, []);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SIMPLE SNS APP</h1>
      <div>ログイン済です。</div>
    </div>
  )
}
