'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { apiRequest } from '../axios/axiosInstance';
import { postData } from '../types/postData';
import { AsyncButton } from '../components/asyncButton';
import { postFactory } from '../models/post_model';

const PostList = () => {
  const [comments, setComments] = useState<{ [key: string]: string }>({});
  const [postList, setPostList] = useState<postData[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, postId: number) => {
    const newComments = { ...comments };
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
          const newComments = { ...prevComments };
          newComments[postId] = "";
          return newComments;
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  const loadNextPostList = async () => {
    async function setNextPostList() {
      const nextPostListLength = postList.length;
      const query = {
        size: 10,
        cursor: nextPostListLength,
        order: "ASC"
      }
      try {
        const response = await postFactory().index(query);
        if (response) {
          setPostList((prevPostList) => {
            const nextPosts = response.filter((post: postData) => !prevPostList.some((prevPost) => prevPost.id === post.id));
            const newPostList = [
              ...prevPostList,
              ...nextPosts,
            ];
            return newPostList;
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
    setNextPostList();
  }

  const postListContainer = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = postListContainer.current;
    if (!el) return;
    const rate = el.scrollTop / (el.scrollHeight - el.clientHeight);
    if (rate > 0.9 && el.scrollTop > 0) {
      loadNextPostList();
    }
  };

  useEffect(() => {
    const query = {
      size: 10,
      cursor: 0,
      order: "ASC"
    }
    async function setInitialPostList() {
      try {
        const response = await postFactory().index(query);
        if (response) {
          setPostList(response);
        }
      } catch (error) {
        console.error(error);
      }
    }
    setInitialPostList();
  }, []);

  return (
    <div className={styles.container}>
      <h1>POST LIST</h1>
      <Link href={'../post'}>投稿を作成する</Link>
      <div className={styles.postListContainer} ref={postListContainer} onScroll={onScroll}>
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
    </div>
  )
}

export default PostList