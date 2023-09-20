'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from './page.module.css';
import { ChatData, RoomUser } from '../types/chatData';
import { roomsFactory } from '../models/rooms_model';
import { formatDateJapanTime } from '../utils/dateUtils/dateUtils';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../atom/state/userDataState';


const ChatList = () => {
  const router = useRouter();
  const [chatList, setChatList] = useState<ChatData[]>([]);
  const userData = useRecoilValue(userDataState);
  const currentUserId = userData?.id;

  const moveChatRoom = async(chatId:string) => {
    router.push(`/chat-list/${chatId}`);
  }

  useEffect(() => {
    (async()=> {
      try {
        const response = await roomsFactory().getChatList();
        setChatList(response);
      }
      catch(error) {
        console.error(error);
      }
    })();
  }, []);

  const getPartnerInfo = (users:RoomUser[]) => {
    const chatPartner = users.find(user => user.userId !== currentUserId);
    return chatPartner;
  }

  return (
    <div className={styles.container}>
      <h1>CHAT LIST</h1>
      <div className={styles.chatListContainer}>
        {chatList && chatList.length > 0 && chatList.map((chat, index) => (
          <div className={styles.chat} key={index} onClick={()=>moveChatRoom(chat.id)}>
            <div className={styles.chatUserInfo}>
              <Image width={40} height={40} alt="プロフィールアイコン" src={getPartnerInfo(chat.roomUsers)?.user.iconImageUrl || "./icon/default_profile_icon.svg"} />
              <div>{ getPartnerInfo(chat.roomUsers)?.user.name }</div>
            </div>
            <div className={styles.chatBody}>
              <div>{chat.messages[0].content.slice(0, 10)}</div>
              <div className={styles.chatTime}>
                { formatDateJapanTime(chat?.messages[0].createdAt)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatList