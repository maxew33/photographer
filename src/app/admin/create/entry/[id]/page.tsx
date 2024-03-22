import ImageEditor from '@/components/imageEditor/ImageEditor'
import { db } from '@/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface ImageProps {
    params: {
        id: string
    }
}
export default async function page(props: ImageProps) {
    const image = await db.image.findFirst({
        where: {
            id: parseInt(props.params.id),
        },
    })
    if (!image) {
        return notFound()
    }
    return (
        <>
            <h1>edit image</h1>
            <br />
            <ImageEditor image={image} />
            <hr />
            <Link href="/admin">Admin panel</Link>
            <Image
                src={image.imagePath ?? ''}
                alt={image.title ?? ''}
                width="400"
                height="400"
            />
        </>
    )
}
