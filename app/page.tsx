'use client'
import React from 'react'
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { apiRequest } from './axios/axiosInstance';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    apiRequest.get('/account')
      .then(response => {
        console.log(response);
        if (Object.keys(response.data).length === 0) {
          router.push('/login');
        }
      })
      .catch(error => {
        router.push('/login');
      })
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SIMPLE SNS APP</h1>
      <div>ログイン済です。</div>
    </div>
  )
}
