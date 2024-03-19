import { db } from '@/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import GalleryEditor from '@/components/galleryEditor/GalleryEditor'

interface GalleryProps {
    params: {
        id: string
    }
}

export default async function Gallery(props: GalleryProps) {
    const id = parseInt(props.params.id)
    const gallery = await db.gallery.findFirst({
        where: {
            id,
        },
    })
    if (!gallery) {
        return notFound()
    }
    return (
        <>
            <div>gallery - {gallery.title}</div>
            <hr />
            <div>edit gallery</div>
            <GalleryEditor gallery={gallery}/>
            <hr/>
            <Link href="/admin">Admin panel</Link>
        </>
    )
}
