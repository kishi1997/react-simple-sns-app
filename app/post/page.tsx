'use client'
import React, { ChangeEvent, useState } from 'react'
import styles from './page.module.css'
import { apiRequest } from '../axios/axiosInstance';
import { useRouter } from 'next/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AsyncButton } from '../components/asyncButton';
import { ErrorDialog } from '../components/errorDialog';
import { errorDialogOpenState } from '../atom/state/errorDialogOpenState';
import { flashMessageState } from '../atom/state/flashMessageState';

const Post = () => {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [errorDialogOpen, setErrorDialogOpen] = useRecoilState(errorDialogOpenState);
  const setFlashMessage = useSetRecoilState(flashMessageState);

  const createPost = async () => {
    apiRequest.post('/posts', {
      "post": {
        "body": text
      }
    })
      .then((response) => {
        setFlashMessage("投稿が完了しました。");
        router.push('../postList');
      })
      .catch((error) => {
        setError(error.message);
        setErrorDialogOpen(true);
      })
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > 140) {
      e.target.style.color = "#ff0000";
    } else {
      e.target.style.color = "#000";
    }
    setText(newText);
  }

  const isFormValid = 0 < text.length && text.length < 141;

  return (
    <div className={styles.container}>
      <h1>MAKE A POST</h1>
      <form className={styles.form} onSubmit={createPost}>
        <div className={styles.form_container}>
            <textarea placeholder='投稿内容を140字以内で入力してください' className={styles.form_textarea} 
                      onChange={handleChange} cols={30} rows={10} value={text}></textarea>
            <div>現在の文字数：{text.length}</div>
        </div>
        <AsyncButton onClick={createPost} isDisabled={!isFormValid}>
          投稿する
        </AsyncButton>
      </form>
      <ErrorDialog errorDialogOpen={errorDialogOpen} error={error}/>
    </div>
  )
}

export default Post