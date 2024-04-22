import { db } from '@/db'
import Link from 'next/link'
import Image from 'next/image'

export default async function Admin() {
    const galleries = await db.gallery.findMany()
    const infos = await db.picinfos.findMany()

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

    const rendredImages = infos.map((info) => {
        return (
            <>
                <Link
                    key={`img${info.id}`}
                    href={`/admin/create/entryInfos/${info.pictureId}`}
                >
                    {info.title ?? 'noname'}
                    <br/>
                    <Image
                    src={info.picturePath}
                    height={info.height}
                    width={info.width}
                    alt={info.title ?? 'noname'}
                    className='image-admin'/>
                </Link>
                <br/>
            </>
        )
    })

    return (
        <>
            <h1>Admin</h1>
            <hr />
            <h2>galleries</h2>
            {rendredGalleries}
            <hr />
            <h2>images</h2>
            {rendredImages}
            <hr />
            <Link href="/admin/create/gallery">Create gallery</Link>
            <br />
            <Link href="/admin/create/entry">Add picture</Link>
            <hr />
            <Link href="/">Accueil</Link>
        </>
    )
}
