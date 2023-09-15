'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../atom/state/userDataState';
import { useParams } from 'next/navigation';
import { messageFactory } from '@/app/models/message_model';
import { chatRoomData } from '@/app/types/chatRoomData';
import { formatDateJapanTime } from '@/app/utils/dateUtils/dateUtils';
import { roomsFactory } from '@/app/models/rooms_model';

const ChatRoom = () => {
    const params = useParams();
    const paramsId = Array.isArray(params) ? params[0] : params.id;
    const [chat, setChat] = useState<chatRoomData[]>([]);
    const [chatPartnerName, setchatPartnerName] = useState<string>("");
    const userData = useRecoilValue(userDataState);
    const currentUserId = userData?.id;

    useEffect(() => {
        (async () => {
            try {
                const roomUsersData = await roomsFactory().getRoomData(paramsId);
                const chatPartner = roomUsersData.find(user => user.userId !== currentUserId);
                if(chatPartner) {
                    setchatPartnerName(chatPartner.user.name);
                }
            }
            catch (error) {
                console.error(error);
            }
        })();
    }, []);
    
    useEffect(() => {
        (async () => {
            try {
                const chatData = await messageFactory().getChat(paramsId);
                setChat(chatData);
            }
            catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            <h1>CHAT ROOM</h1>
            {chatPartnerName && <h2>{chatPartnerName}</h2>}
            {userData && chat.length > 0 && chat.slice().reverse().map((item, index) => (
                <div key={index} className={item.user.id !== userData.id ? styles.left : styles.right}>
                    {item.user.id !== userData.id &&
                        <Image width={20} height={20} alt="アイコン画像" src={item.user.iconImageUrl || "/icon/default_profile_icon.svg"} />
                    }
                    {item.post && <div className={styles.post}>{item.post.body}</div>}
                    <div>{item.content}</div>
                    <div className={styles.time}>{formatDateJapanTime(item.createdAt)}</div>
                </div>
            ))}
        </div >
    )
}

export default ChatRoom