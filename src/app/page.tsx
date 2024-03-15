import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    return (
        <>
            <main className={styles.main}>
                <h1>hello max</h1>
                <hr />
                <Link href="/admin">admin page</Link>
                <br />
                <Link href="/admin/create"> create Page</Link>
            </main>
        </>
    )
}
