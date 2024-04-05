'use server'

import { db } from '@/db'
import type { Gallery, Picinfos } from '@prisma/client'
import { redirect } from 'next/navigation'

// type ImageDataWithoutId = Omit<Image, 'id'>
type PicinfosWithoutId = Omit<Picinfos, 'id'>

// ======== Gallery actions ========= //

export async function editGallery(id: number, updatedGallery: Gallery) {
    await db.gallery.update({
        where: { id },
        data: updatedGallery,
    })

    console.log('gallery edited', updatedGallery)

    redirect('/admin')
}

export async function deleteGallery(id: number) {
    await db.gallery.delete({
        where: { id },
    })

    redirect('/admin')
}

// ======== Pictures actions ========= //

export async function editPictureInfos(id: number, updatedInfos: Picinfos) {
    await db.picinfos.update({
        where: { id },
        data: updatedInfos,
    })

    console.log('image edited', updatedInfos)

    redirect('/admin')
}

export async function createPictureInfos(infos: PicinfosWithoutId) {
    // create a new record in the db
    await db.picinfos.create({
        data: infos,
    })

    console.log('infos add', infos)

    // Redirect the user to the admin page
    redirect('/admin')
}

// export async function CreateImage(newImage: ImageDataWithoutId) {

//     console.log(456)
//     await db.image.create({
//         data: newImage,
//     })

//     redirect('/admin')
// }

// export async function editImage(id: number, updatedImage: Image) {
//     await db.image.update({
//         where: { id },
//         data: updatedImage,
//     })

//     console.log('image edited', updatedImage)

//     redirect('/admin')
// }

// export async function deleteImage(id: number, pathToDelete: string) {

//     pathToDelete && await access(pathToDelete)

//     // Delete the file
//     pathToDelete && await unlink(pathToDelete)

//     console.log('Image deleted successfully')
//     await db.image.delete({
//         where: { id },
//     })

//     redirect('/admin')
// }
