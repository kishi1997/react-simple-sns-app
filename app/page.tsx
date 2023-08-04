'use client'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import React from 'react'

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const storedUserToken = localStorage.getItem("createdUserToken");
    if (!storedUserToken) {
      router.push('/register');
    }
  }, []);


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SIMPLE SNS APP</h1>
      <div>ログイン済です。</div>
    </div>
  )
}
