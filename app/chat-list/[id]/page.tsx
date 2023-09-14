'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../atom/state/userDataState';
import { useParams } from 'next/navigation';
import { messageFactory } from '@/app/models/message_model';
import { chatRoomData } from '@/app/types/chatRoomData';
import { formatDateJapanTime } from '@/app/utils/dateUtils/dateUtils';

const ChatRoom = () => {
    const params = useParams();
    const paramsId = Array.isArray(params) ? params[0] : params.id;
    const [chat, setChat] = useState<chatRoomData[]>([]);
    const userData = useRecoilValue(userDataState);

    useEffect(() => {
        (async () => {
            try {
                const response = await messageFactory().getChat(paramsId);
                setChat(response);
                console.log(userData);
                console.log(response);
            }
            catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <div className={styles.container}>
            <h1>CHAT ROOM</h1>
            {userData && chat.length > 0 && chat.slice().reverse().map((item, index) => (
                <div key={index} className={item.user.id !== userData.id ? styles.left : styles.right}>
                    {item.post && <div className={styles.post}>{item.post.body}</div>}
                    <div>{item.content}</div>
                    <div className={styles.time}>{formatDateJapanTime(item.createdAt)}</div>
                </div>
            ))}
        </div >
    )
}

export default ChatRoom