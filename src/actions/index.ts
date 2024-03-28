'use server'

import { db } from '@/db'
import type { Gallery, Image } from '@prisma/client'
import { writeFile, access, unlink } from 'fs/promises'
import { redirect } from 'next/navigation'
import path from 'path'

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

    console.log(456)
    await db.image.create({
        data: newImage,
    })

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

export async function deleteImage(id: number, pathToDelete: string) {

    pathToDelete && await access(pathToDelete)

    // Delete the file
    pathToDelete && await unlink(pathToDelete)

    console.log('Image deleted successfully')
    await db.image.delete({
        where: { id },
    })

    redirect('/admin')
}
