import { db } from '@/db'
import { unlink } from 'fs/promises'
import { redirect } from 'next/navigation'

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

    console.log('toto', entry)

    if (!entry) {
        redirect('/admin')
    }

    const { picturePath, pictureId } = entry

    async function deleteImage() {
        try {
            // delete picture data
            await db.gallery.delete({
                where: { id },
            })

            // delete picture from db
            await db.picture.delete({
                where: { id: pictureId },
            })

            //delete pictue
            await unlink(picturePath)

            console.log('Image and file deleted')
        } catch (error) {
            console.error(
                'Error occurred while deleting image and file:',
                error
            )
        }

        redirect('/admin')
    }

    deleteImage()
}
