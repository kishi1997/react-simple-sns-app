'use client'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import './globals.css'
import { Inter } from 'next/font/google'
import { userDataState } from './atom/state/userDataState';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { FlashMessage } from './components/flashMessage';
import FooterNavigation from './components/footerNavigation';
import { userFactory } from './models/user_model';

const inter = Inter({ subsets: ['latin'] })

export function LoginChecker({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const setUserData = useSetRecoilState(userDataState);

  useEffect(() => {
    if (pathname === "/login" || pathname === "/register") return;
    (async()=> {
      try {
        const response = await userFactory().get();
        setUserData(response.data.user);
        if (Object.keys(response.data).length === 0) {
          router.push('/login');
        }
      }
      catch (error) {
        console.error(error);
      }
    })();
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
            <FlashMessage />
            {children}
            <FooterNavigation />
          </body>
        </html>
      </LoginChecker>
    </RecoilRoot>
  )
}
