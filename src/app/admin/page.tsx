import { db } from '@/db'
import Link from 'next/link'

export default async function Admin() {
    const galleries = await db.gallery.findMany()

    const images = await db.image.findMany()

    console.log(galleries, images)

    const rendredGalleries = galleries.map((gallery) => {
        return <div key={`img${gallery.id}`}>{gallery.title}</div>
    })

    return (
        <>
            <h1>Admin</h1>
            <hr />
            <h2>galleries</h2>
            {rendredGalleries}
            <hr />
            <h2>images</h2>
            {images.map((img) => {
                <div key={`img${img.id}`}>{img.title}</div>
            })}
            <hr />
            <Link href="/admin/create/gallery">Create gallery</Link>
            <br />
            <Link href="/admin/create/entry">Add picture</Link>
            <hr />
            <Link href="/">Accueil</Link>
        </>
    )
}
