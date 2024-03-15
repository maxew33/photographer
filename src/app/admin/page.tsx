import { db } from '@/db'
import Link from 'next/link'

export default async function Admin() {
    const galleries = await db.gallery.findMany()

    console.log(galleries)

    const rendredGalleries = galleries.map((gallery) => {
        return <div key={gallery.id}>{gallery.title}</div>
    })

    return (
        <>
            <h1>Admin</h1>
            <hr />
            <h2>galleries</h2>
            {rendredGalleries}
            <hr />
            <Link href="/admin/create">Create page</Link>
            <br />
            <Link href="/">Accueil</Link>
        </>
    )
}
