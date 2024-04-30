import React from 'react'
import Link from 'next/link'
import { db } from '@/db'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import path from 'path'

export default function NewEntry() {
    async function addImage(formData: FormData) {
        // This needs to be a server action
        'use server'

        // check the input
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

        let newPicId = 0

        // dans la bdd, créer une entrée pour les images avec id / path

        try {
            // Write the file to the specified directory (public/assets) with the modified filename
            await writeFile(path.join(process.cwd(), filePath), buffer)
            console.log('upload done')
            // Return a JSON response with a success message and a 201 status code
        } catch (error) {
            // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
            console.log('Error occurred ', error)
        }

        try {
            const newPic = await db.picture.create({
                data: {
                    path: imagePath,
                },
            })

            console.log('new picture added : ', newPic)

            newPicId = newPic.id
        } catch (err) {
            console.error(err)
            //rediriger vers une page d'erreur
        }
        
        redirect('/admin/create/entryInfos/' + newPicId)
    }

    return (
        <>
            <h2>Ajouter une image</h2>

            <form action={addImage}>
                <label htmlFor="upload">Ajouter une image :</label>
                <input type="file" name="upload" id="upload" required />
                <button type="submit">submit</button>
            </form>

            <br />
            <Link href="/admin">Admin panel</Link>
            <br />
            <Link href="/">Accueil</Link>
        </>
    )
}
