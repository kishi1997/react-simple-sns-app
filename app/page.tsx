'use client'
import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilValue} from 'recoil';
import { userDataState } from './atom/state/userDataState';

export default function Home() {
  const router = useRouter();
  const userData = useRecoilValue(userDataState);

  useEffect(()=> {
    if(!userData) {
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
