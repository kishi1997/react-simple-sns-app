'use client'
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'
import { useRecoilValue } from 'recoil';
import { userDataState } from '../atom/state/userDataState';

const MyPage = () => {
  const userData = useRecoilValue(userDataState);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MY PAGE</h1>
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
