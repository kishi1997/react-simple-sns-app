'use client'
import React from 'react'
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SIMPLE SNS APP</h1>
      <Link href={'./mypage'}>マイページ</Link>
    </div>
  )
}
