import { db } from '@/db'
import { unlink } from 'fs/promises'
import { redirect } from 'next/navigation'
import path from 'path'

interface PictureProps {
    params: {
        id: string
    }
}

export default async function DeleteImage(props: PictureProps) {
    const id = parseInt(props.params.id)

    const entry = await db.picinfos.findFirst({
        where: {
            id,
        },
    })

    if (!entry) {
        redirect('/admin')
    }

    const { picturePath, pictureId } = entry

    async function deleteImage() {

        console.log('********************************')
        console.log('deleting')
        console.log('********************************')

        try {
            // delete picture data
            await db.picinfos.delete({
                where: { id },
            })

            // delete picture from db
            await db.picture.delete({
                where: { id: pictureId },
            })

            const basePath = process.cwd()

            const relativeFilePath = 'public' + picturePath

            //delete picture
            await unlink(path.join(basePath, relativeFilePath))

            console.log('Image and file deleted')

            // redirect('/admin')

        } catch (error) {
            console.error(
                'Error occurred while deleting image and file:',
                error
            )
        }
    }

    await deleteImage()
    redirect('/admin')
}
