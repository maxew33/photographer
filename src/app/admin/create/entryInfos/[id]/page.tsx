import { db } from '@/db'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'
import * as action from '@/actions'
import CreatePictureInfos from '@/components/createPictureInfos/CreatePictureInfos'

interface PictureProps {
    params: {
        id: string
    }
}
export default async function page(props: PictureProps) {
    console.log(props)

    const picId = parseInt(props.params.id)

    const picture = await db.picture.findFirst({
        where: {
            id: picId,
        },
    })
    if (!picture) {
        return notFound()
    }

    // console.log(picture.path)

    // async function editImage(formData: FormData) {
    //     'use server'
    //     console.log("edit", formData, picId)

    //     // check the inputs
    //     const title = formData.get('imageTitle') as string
    //     const content = formData.get('imageDescription') as string
    //     const date = formData.get('imageDate')?.toLocaleString() as string
    //     const place = formData.get('imagePlace') as string

    //     const data = {
    //         id:picId,
    //         title,
    //         imagePath:'',
    //         content,
    //         date,
    //         place,

    //     }

    //     // action.editImage(null, imgId, )

    //     // editImageAction()

    //     action.editImage(
    //         picId,
    //         data
    //     )

    // }

    // const editImageAction = action.editImage.bind(
    //     null,
    //     picId
    // )

    // async function deleteImage() {
    //     'use server'
    //     console.log("delete")
    //     redirect('/admin')
    // }

    return (
        <>
            <h1>edit image id: </h1>
            <CreatePictureInfos picture={picture} />
            <br />
            {/* <form action={editImage}>
            <label htmlFor="imageTitle">Nom de l'image :</label>
                <input type="text" name="imageTitle" id="imageTitle" />
                <label htmlFor="imageDescription">
                    Description de l'image id:
                </label>
                <textarea name="imageDescription" id="imageDescription" 
                value="1"/>
                <label htmlFor="imagePlace">Localisation :</label>
                <input type="text" name="imagePlace" id="imagePlace" />

                <label htmlFor="imageDate">Date de la prise de vue :</label>
                <input type="date" name="imageDate" id="imageDate" />
                <label htmlFor="imageGalleries">Galerie(s) :</label>
                <select
                    name="imageGalleries"
                    id="imageGalleries"
                    multiple
                >

                </select>
                <Image
                src={picture.path ?? ''}
                alt={''}
                width="400"
                height="400"
            />
            <label htmlFor="upload">changer d'image</label>
                <input type="file" name="upload" id="upload" required />
                <button type="submit">submit</button>
                </form>
            <br />
            <form action={deleteImage}>
                <button type="submit">delete</button>
            </form> */}
            <hr />
            <Link href="/admin">Admin panel</Link>
        </>
    )
}
