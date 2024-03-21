import { db } from '@/db'
import Link from 'next/link'

export default async function Admin() {
    const galleries = await db.gallery.findMany()

    // const images = await db.image.findMany()

    const rendredGalleries = galleries.map((gallery) => {
        return (
            <>
                <Link
                    key={`img${gallery.id}`}
                    href={`/admin/create/gallery/${gallery.id}`}
                >
                    {gallery.title}
                </Link>
                <br/>
            </>
        )
    })

    // const rendredImages = images.map((image) => {
    //     return (
    //         <>
    //             <Link
    //                 key={`img${image.id}`}
    //                 href={`/admin/create/gallery/${image.id}`}
    //             >
    //                 {image.title}
    //             </Link>
    //             <br/>
    //         </>
    //     )
    // })

    return (
        <>
            <h1>Admin</h1>
            <hr />
            <h2>galleries</h2>
            {rendredGalleries}
            <hr />
            <h2>images</h2>
            {/* {rendredImages} */}
            <hr />
            <Link href="/admin/create/gallery">Create gallery</Link>
            <br />
            <Link href="/admin/create/entry">Add picture</Link>
            <hr />
            <Link href="/">Accueil</Link>
        </>
    )
}
