'use client'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { apiRequest } from '../axios/axiosInstance';
import { postData } from '../types/postData';
import { AsyncButton } from '../components/asyncButton';

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

  const loadNextPostList = async() => {
    const nextPostListLength = postList.length;
      apiRequest.get(`/posts?pagination[cursor]=${nextPostListLength}&pagination[size]=10&pagination[order]=ASC`)
        .then((response) => {
          setPostList((prevPostList) => {
            const newPosts = response.data.posts.filter((post:postData) => !prevPostList.some((prevPost) => prevPost.id === post.id));
            const newPostList = [
              ...prevPostList,
              ...newPosts,
            ];
            return newPostList;
          });
        })
        .catch((error) => {
          console.error(error);
        });
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
    apiRequest.get('/posts?pagination[cursor]=0&pagination[size]=10&pagination[order]=ASC')
      .then((response) => {
        const data = response.data;
        setPostList(data.posts);
      })
      .catch((error) => {
        console.error(error);
      })
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