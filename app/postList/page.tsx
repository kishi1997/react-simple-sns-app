'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { apiRequest } from '../axios/axiosInstance';
import { postData } from '../types/postData';
import { AsyncButton } from '../components/asyncButton';
import FooterNavigation from '../components/footerNavigation';

const PostList = () => {
  const [comments, setComments] = useState<{[key:string]:string}>({});
  const [postList, setPostList] = useState<postData[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, postId: number) => {
    const newComments = {...comments};
    newComments[postId] = e.target.value;
    setComments(newComments);
  }

  const addComment = async (postId: number) => {
    apiRequest.post('/messages/via_post', {
      "content": comments[postId],
      "postId": postId
    })
      .then(response => {
        setComments(prevComments => {
          const newComments = {...prevComments};
          newComments[postId] = "";
          return newComments;
        })
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
            <form className={styles.form} onSubmit={() => addComment(post.id)}>
              <input onChange={(e) => handleChange(e, post.id)} value={comments[post.id] || ""} type="text" placeholder='コメントはこちらに入力してください。' />
              <AsyncButton isDisabled={!comments[post.id] || comments[post.id].length < 1} onClick={() => addComment(post.id)}>send</AsyncButton>
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