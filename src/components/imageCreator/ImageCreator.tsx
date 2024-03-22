'use client'

import React from 'react'
import type { Image } from '@prisma/client'
import * as action from '@/actions'
import { db } from '@/db'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import path from 'path'

export default function ImageCreator() {
    async function createImage(formData: FormData) {
        // check the inputs
        const title = formData.get('imageTitle') as string
        const content = formData.get('imageDescription') as string
        const date = formData.get('imageDate')?.toLocaleString() as string
        const place = formData.get('imagePlace') as string

        const fileInput = formData.get('upload') as File

        if (!fileInput) {
            console.error('No file selected')
            return
        }

        // Validate file extension
        const allowedExtensions = ['.jpg', '.jpeg', '.png']
        const fileExtension = path.extname(fileInput.name).toLowerCase()
        if (!allowedExtensions.includes(fileExtension)) {
            console.error('Invalid file extension')
            return
        }

        // Validate file size
        const maxSizeInBytes = 5 * 1024 * 1024 // 10MB
        if (fileInput.size > maxSizeInBytes) {
            console.error('File size exceeds the limit')
            return
        }

        // Convert the file data to a Buffer
        const buffer = Buffer.from(await fileInput.arrayBuffer())
        const filename = fileInput.name.replaceAll(' ', '_')
        const filePath = 'public/assets/' + filename

        const imagePath = '/assets/' + filename

        action.CreateImage({ title, imagePath, content, date, place })

        // try {
        //     // Write the file to the specified directory (public/assets) with the modified filename
        //     await writeFile(path.join(process.cwd(), filePath), buffer)
        //     console.log('upload done')
        //     // Return a JSON response with a success message and a 201 status code
        // } catch (error) {
        //     // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
        //     console.log('Error occurred ', error)
        // }

        // // create a new record in the db
        // const image = await db.image.create({
        //     data: {
        //         title,
        //         imagePath,
        //         content,
        //         date,
        //         place,
        //         // galleries
        //     },
        // })
        // // Redirect the user to the admin page
        // redirect('/admin')
        // confirmation modal + erase the form
    }

    return (
        <>
            <div>ImageCreator</div>
            <form action={createImage}>
                <label htmlFor="imageTitle">Nom de l'image :</label>
                <input type="text" name="imageTitle" id="imageTitle" />
                <label htmlFor="imageDescription">
                    Description de l'image :
                </label>
                <textarea name="imageDescription" id="imageDescription" />
                <label htmlFor="imagePlace">Localisation :</label>
                <input type="text" name="imagePlace" id="imagePlace" />

                <label htmlFor="imageDate">Date de la prise de vue :</label>
                <input type="date" name="imageDate" id="imageDate" />
                <label htmlFor="imageGalleries">Galerie(s) :</label>
                <select
                    name="imageGalleries"
                    id="imageGalleries"
                    multiple
                ></select>
                <input type="file" name="upload" id="upload" required />
                <button type="submit">submit</button>
            </form>
        </>
    )
}
