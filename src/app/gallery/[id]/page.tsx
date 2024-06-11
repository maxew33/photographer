import { db } from '@/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface GalleryProps {
    params: {
        id: string
    }
}

export default async function Gallery(props: GalleryProps) {
    const infos = await db.picinfos.findMany()

    const id = parseInt(props.params.id)
    const gallery = await db.gallery.findFirst({
        where: {
            id,
        },
    })
    if (!gallery) {
        return notFound()
    }

    const pic = gallery.featuredImageId
        ? await db.picinfos.findUnique({ where: { id: gallery.featuredImageId } })
        : null;

    return (
        <>
            <h1>{gallery.title}</h1>
            <br />
            {pic && <Image
                src={pic.picturePath}
                height={pic.height}
                width={pic.width}
                alt={pic.title ?? 'noname'}
                className="image-admin"
            />}
            <hr />
            <Link href="/">Accueil</Link>
        </>
    )
}
