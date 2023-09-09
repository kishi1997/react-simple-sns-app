'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from './page.module.css';
import { chatData } from '../types/chatData';
import { roomsFactory } from '../models/rooms_model';
import { formatDateJapanTime } from '../utils/dateUtils/dateUtils';

const ChatList = () => {
  const [chatList, setChatList] = useState<chatData[]>([]);

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

  return (
    <div className={styles.container}>
      <h1>CHAT LIST</h1>
      <div className={styles.chatListContainer}>
        {chatList && chatList.length > 0 && chatList.map((chat, index) => (
          <div className={styles.chat} key={index}>
            <div className={styles.chatUserInfo}>
              <Image width={40} height={40} alt="プロフィールアイコン" src={chat?.roomUsers[0].user.iconImageUrl || "./icon/default_profile_icon.svg"} />
              <div>{chat.roomUsers[0].user.name}</div>
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