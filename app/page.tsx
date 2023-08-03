'use client'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userDataState } from './atom/state/userDataState';

export default function Home() {
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if(!storedUserData) {
      router.push('/register');
    } else {
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SIMPLE SNS APP</h1>
      <div>ログイン済です。</div>
    </div>
  )
}
