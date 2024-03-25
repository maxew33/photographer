'use server'

import { db } from '@/db'
import type { Gallery, Image } from '@prisma/client'
import { writeFile, access, unlink } from 'fs/promises'
import { redirect } from 'next/navigation'
import path from 'path'

type ImageDataWithoutId = Omit<Image, 'id'>

interface FileData {
    fileInput: File;
    filePath: string;
}

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

    console.log(123)
    await db.image.create({
        data: newImage,
    })

    // try {
    //     const buffer = Buffer.from(await ImageData.fileInput.arrayBuffer())
    //     // Write the file to the specified directory (public/assets) with the modified filename
    //     await writeFile(path.join(process.cwd(), ImageData.filePath), buffer)
    //     console.log('upload done')
    // } catch (error) {
    //     // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    //     console.log('Error occurred ', error)
    // }

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
