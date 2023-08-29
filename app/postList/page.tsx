'use client'
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { apiRequest } from '../axios/axiosInstance';
import { postData } from '../types/postData';
import { AsyncButton } from '../components/asyncButton';
import FooterNavigation from '../components/footerNavigation';

const PostList = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [postList, setPostList] = useState<postData[]>([]);
  const [formValid, setFormValid] = useState<boolean[]>(Array(comments.length).fill(false));

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const newComments = [...comments]
    newComments[index] = e.target.value;
    setComments(newComments);

    const newFormValid = [...formValid];
    newFormValid[index] = e.target.value.length >= 1;
    setFormValid(newFormValid);
  }

  const addComment = async (postId: number, index: number) => {
    apiRequest.post('/messages/via_post', {
      "content": comments[index],
      "postId": postId
    })
      .then(response => {
        setComments(prevComments => {
          const newComments = [...prevComments];
          newComments[index] = "";
          return newComments;
        })
        setFormValid(prevFormValid => {
          const newFormValid = [...prevFormValid];
          newFormValid[index] = false;
          return newFormValid;
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    apiRequest.get('/posts')
      .then((response) => {
        const data = response.data.posts;
        setPostList(data);
      })
      .catch((error) => {
        console.error(error);
      })
  }, []);

  return (
    <div className={styles.container}>
      <h1>POST LIST</h1>
      <div className={styles.postListContainer}>
        {postList.length > 0 && postList.map((post, index) => (
          <div key={index} className={styles.post}>
            <div className={styles.userInfo}>
              <Image width={40} height={40} alt="プロフィールアイコン" src={post.user.iconImageUrl || "./icon/default_profile_icon.svg"} />
              <div>{post.user.name}</div>
            </div>
            <div className={styles.postBody}>
              <div>{post.body}</div>
              <div className={styles.postTime}>{new Date(post.createdAt).toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" })}</div>
            </div>
            <form className={styles.form} onSubmit={() => addComment(post.id, index)}>
              <input onChange={(e) => handleChange(e, index)} value={comments[index] || ""} type="text" placeholder='コメントはこちらに入力してください。' />
              <AsyncButton isDisabled={!formValid[index]} onClick={() => addComment(post.id, index)}>send</AsyncButton>
            </form>
          </div>
        ))}
      </div>
      <Link href={'../post'}>投稿を作成する</Link>
      <FooterNavigation></FooterNavigation>
    </div>
  )
}

export default PostList