'use server'

import { db } from '@/db'
import type { Gallery, Picinfos } from '@prisma/client'
import { unlink } from 'fs/promises'
import { redirect } from 'next/navigation'
import path from 'path'

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

export async function updatePictureInfos(id: number, updatedInfos: Picinfos) {
    console.log('update in progress')

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

export async function deletePicture(
    id: number,
    pictureId: number,
    picturePath: string
) {
    await db.picinfos.delete({
        where: { id },
    })

    await db.picture.delete({
        where: { id: pictureId },
    })

    const basePath = process.cwd()

    const relativeFilePath = 'public' + picturePath

    //delete picture
    await unlink(path.join(basePath, relativeFilePath))

    console.log('********************** everything works fine !')

    redirect('/admin')
}
