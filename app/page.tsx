import styles from './page.module.css'
import Register from './components/register'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SIMPLE SNS APP</h1>
      <Register />
    </div>
  )
}
