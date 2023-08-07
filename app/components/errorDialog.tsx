import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import styles from '../styles/errorDialog.module.css'
import { errorState } from '../atom/state/error';
import { errorDialogOpenState } from '../atom/state/error';

const ErrorDialog = () => {
    const error = useRecoilValue(errorState);
    const [errorDialogOpen, setErrorDialogOpen] = useRecoilState(errorDialogOpenState);
    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    }
    return (
        <>
        { errorDialogOpen && (
            <div className={styles.dialog}>
                <div>登録エラーが発生しました。</div>
                <div>{error}</div>
                <button onClick={handleCloseErrorDialog}>閉じる</button>
            </div>
        )}
        </>
  )
}

export default ErrorDialog