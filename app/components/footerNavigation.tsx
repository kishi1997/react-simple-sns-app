import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/footerNavigation.module.css'
import { useRecoilValue } from 'recoil'
import { userDataState } from '../atom/state/userDataState'
import { usePathname } from 'next/navigation'

const FooterNavigation = () => {
  const [footerDisplay, setFooterDisplay] = useState<boolean>(false);
  const userData = useRecoilValue(userDataState);
  const pathname = usePathname();

  useEffect(()=> {
    if (pathname === "/login" || pathname === "/register") {
      setFooterDisplay(false);
    } else {
      setFooterDisplay(true);
    }
  },[pathname])

  return (
    <>
      { footerDisplay && (
        <footer className={styles.container}>
          <Link href={'../mypage'}><Image alt="ポストリストアイコン" width={30} height={30} src={"./icon/icon_postList.svg"} /></Link>
          <Link href={'/'}><Image alt="ホームアイコン" width={30} height={30} src={"./icon/icon_home.svg"} /></Link>
          <Link href={'../mypage'}><Image alt="メッセージアイコン" width={30} height={30} src={"./icon/icon_message.svg"} /></Link>
          <Link href={'../mypage'}><Image alt="プロフィール画像" width={30} height={30} src={userData?.iconImageUrl || "./icon/default_profile_icon.svg"} /></Link>
        </footer>
      )}
    </>
  )
}

export default FooterNavigation