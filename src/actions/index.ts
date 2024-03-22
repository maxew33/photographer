'use server'

import { db } from '@/db'
import type { Gallery, Image } from '@prisma/client'
import { redirect } from 'next/navigation'

type ImageDataWithoutId = Omit<Image, 'id'>

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

// ======== Image actions ========= //

export async function CreateImage(newImage: ImageDataWithoutId) {
    await db.image.create({
        data: newImage,
    })

    console.log('image edited', newImage)

    redirect('/admin')
}

export async function editImage(id: number, updatedImage: Image) {
    await db.image.update({
        where: { id },
        data: updatedImage,
    })

    console.log('image edited', updatedImage)

    redirect('/admin')
}

export async function deleteImage(id: number) {
    await db.image.delete({
        where: { id },
    })

    redirect('/admin')
}
