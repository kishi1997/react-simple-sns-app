'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { apiRequest } from '../axios/axiosInstance';
import { userData } from '../types/userData';

const MyPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<userData | null>(null);

  useEffect(() => {
    apiRequest.get('/account')
      .then((response) => {
        const data = response.data;
        setUserData(data.user);
      })
      .catch((error) => {
        router.push('/login');
      })
  });


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SIMPLE SNS APP</h1>
      <div className={styles.info}>
        <Image width={40} height={40} src={userData?.iconImageUrl || "./icon/default_profile_icon.svg"} alt='プロフィール画像' />
        <span>名前：{userData?.name}</span>
        <span>email：{userData?.email}</span>
        <span>id：{userData?.id}</span>
      </div>
      <div className={styles.link}>
        <Link href="../login">プロフィールを編集</Link>
      </div>
      <div className={styles.btn}>
        <button>ログアウトする</button>
      </div>
    </div>
  )
}

export default MyPage
