'use client'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import './globals.css'
import { Inter } from 'next/font/google'
import { userDataState } from './atom/state/userDataState';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { apiRequest } from './axios/axiosInstance'

const inter = Inter({ subsets: ['latin'] })

export function LoginChecker ({children}: {children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname()
  const setUserData = useSetRecoilState(userDataState);

  useEffect(() => {
    if(pathname === "/login" || pathname === "/register") return;
    apiRequest.get('/account')
      .then((response) => {
        const data = response.data;
        setUserData(data.user);
        if (Object.keys(response.data).length === 0) {
          router.push('/login');
        }
      })
      .catch((error) => {
        router.push('/login');
      })
  }, [pathname]);
  return <>{children}</>;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RecoilRoot>
      <LoginChecker>
        <html lang="ja">
          <body className={inter.className}>
            {children}
          </body>
        </html>
      </LoginChecker>
    </RecoilRoot>
  )
}
