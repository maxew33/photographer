import { db } from '@/db'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import CreatePictureInfos from '@/components/createPictureInfos/CreatePictureInfos'
import UpdatePictureInfos from '@/components/updatePictureInfos/UpdatePictureInfos'

interface PictureProps {
    params: {
        id: string
    }
}
export default async function page(props: PictureProps) {

    const picId = parseInt(props.params.id)

    const entry = await db.picinfos.findFirst({
        where: {
            pictureId: picId,
        },
    })

    if (!entry) {
        console.log('new entry')
    }

    const picture = await db.picture.findFirst({
        where: {
            id: picId,
        },
    })

    if (!picture) {
        return notFound()
    }

    return (
        <>
            {entry ? <UpdatePictureInfos infos={entry}/> : <CreatePictureInfos picture={picture} />}
            {/* <CreatePictureInfos picture={picture} /> */}
            <br />

            <hr />
            <Link href="/admin">Admin panel</Link>
        </>
    )
}
