import Link from 'next/link'
import styles from './page.module.css'
import { db } from '@/db'
import Image from 'next/image'

export default async function Home() {

    const galleries = await db.gallery.findMany()

    const rendredGalleries = galleries && galleries.map(async (gallery) => {
        const pic = gallery.featuredImageId
        ? await db.picinfos.findUnique({ where: { id: gallery.featuredImageId } })
        : null;
        return (
            <>
                <Link
                    key={`img${gallery.id}`}
                    href={`/gallery/${gallery.id}`}
                >
                    {gallery.title}
                    
                    {pic && <Image
                        src={pic.picturePath}
                        height={pic.height}
                        width={pic.width}
                        alt={pic.title ?? 'noname'}
                        className="image-admin"
                    />}
                </Link>
                <br />
            </>
        )
    })

    return (
        <>
            <main className={styles.main}>
                <h1>hello max</h1>
                <hr />
                {rendredGalleries}
                <hr/>
                <Link href="/admin">admin page</Link>
            </main>
        </>
    )
}
