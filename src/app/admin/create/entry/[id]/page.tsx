import { db } from '@/db'
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
    return <div>entry - {image.place}</div>
}
