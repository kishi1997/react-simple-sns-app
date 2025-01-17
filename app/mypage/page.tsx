'use client'
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css'
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userDataState } from '../atom/state/userDataState';
import { useRouter } from 'next/navigation';
import { USER_TOKEN_KEY } from '../storage/tokenStorage';
import { flashMessageState } from '../atom/state/flashMessageState';

const MyPage = () => {
  const router = useRouter();
  const userData = useRecoilValue(userDataState);
  const setUserData = useSetRecoilState(userDataState);
  const setFlashMessage = useSetRecoilState(flashMessageState);

  const handleLogOut = async () => {
    const confirmLogOut = window.confirm("ログアウトしますか？");
    if (!confirmLogOut) return;
    localStorage.removeItem(USER_TOKEN_KEY);
    setUserData(null);
    setFlashMessage("ログアウトしました");
    router.push('/login');
  }
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
        <Link href="../edit-profile">プロフィールを編集</Link>
      </div>
      <div className={styles.btn}>
        <button onClick={handleLogOut}>ログアウトする</button>
      </div>
    </div>
  )
}

export default MyPage
