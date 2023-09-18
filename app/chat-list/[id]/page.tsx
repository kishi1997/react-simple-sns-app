'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';
import { useRecoilValue } from 'recoil';
import { userDataState } from '../../atom/state/userDataState';
import { useParams } from 'next/navigation';
import { messageFactory } from '@/app/models/message_model';
import { chatRoomData } from '@/app/types/chatRoomData';
import { formatDateJapanTime } from '@/app/utils/dateUtils/dateUtils';
import { roomsFactory } from '@/app/models/rooms_model';
import { AsyncButton } from '@/app/components/asyncButton';

const ChatRoom = () => {
    const params = useParams();
    const roomId = Array.isArray(params) ? params[0] : params.id;
    const [chat, setChat] = useState<chatRoomData[]>([]);
    const [chatPartnerName, setchatPartnerName] = useState<string>("");
    const userData = useRecoilValue(userDataState);
    const currentUserId = userData?.id;
    const [message, setMessage] = useState<string>("");
    const chatContainerRef = useRef<null | HTMLDivElement>(null);
    const chatItemRef = useRef<null | HTMLDivElement>(null);
    const chatContainer = chatContainerRef.current;
    const chatItem = chatItemRef.current;

    const sendChat = async () => {
        try {
            const sendChatData = {
                content: message,
                roomId: roomId
            }
            const response = await messageFactory().sendChat(sendChatData);
            setMessage("");
            setChat((prevChat) => {
                const newChat = [response, ...prevChat]
                return newChat;
            })
        }
        catch (error) {
            console.error(error);
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    useEffect(() => {
        (async () => {
            try {
                const roomUsersData = await roomsFactory().getRoomData(roomId);
                const chatPartner = roomUsersData.find(user => user.userId !== currentUserId);
                if (chatPartner) {
                    setchatPartnerName(chatPartner.user.name);
                }
            }
            catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        const paginationData = { size: 10, cursor: null };
        (async () => {
            try {
                const chatData = await messageFactory().getChat(roomId, paginationData);
                setChat(chatData);
            }
            catch (error) {
                console.error(error);
            }
        })();
    }, []);

    useEffect(() => {
        if (chatContainer && chat.length < 11) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chat]);

    const isFormValid = 0 < message.length;

    return (
        <div className={styles.container}>
            <h1>CHAT ROOM</h1>
            {chatPartnerName && <h2>{chatPartnerName}</h2>}
            <div className={styles.chatContainer} ref={chatContainerRef} >
                {userData && chat.length > 0 && chat.slice().reverse().map((item, index) => (
                    <div key={index} ref={chatItemRef} className={item.user.id !== userData.id ? styles.left : styles.right}>
                        {item.user.id !== userData.id &&
                            <Image width={20} height={20} alt="アイコン画像" src={item.user.iconImageUrl || "/icon/default_profile_icon.svg"} />
                        }
                        {item.post && <div className={styles.post}>{item.post.body}</div>}
                        <div>{item.content}</div>
                        <div className={styles.time}>{formatDateJapanTime(item.createdAt)}</div>
                    </div>
                ))}
            </div>
            <form onSubmit={sendChat} className={styles.form}>
                <input value={message} onChange={handleChange} type="text" />
                <AsyncButton onClick={sendChat} isDisabled={!isFormValid}>
                    送信
                </AsyncButton>
            </form>
        </div >
    )
}

export default ChatRoom