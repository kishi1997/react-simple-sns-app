import styles from '../styles/errorDialog.module.css';
import { useSetRecoilState } from 'recoil';
import { errorDialogOpenState } from '../atom/state/errorDialogOpenState';

type errorDialogProps = {
    errorDialogOpen: boolean;
    error: string;
}
export const ErrorDialog = ({ errorDialogOpen, error }: errorDialogProps) => {
    const setErrorDialogOpen = useSetRecoilState(errorDialogOpenState);

    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false);
    }

    return (
        <>
            {errorDialogOpen && (
                <div className={styles.dialog}>
                    <div>エラーが発生しました。</div>
                    <div>{error}</div>
                    <button onClick={handleCloseErrorDialog}>閉じる</button>
                </div>
            )}
        </>
    )
}