import React from 'react'
import styles from '../Create.module.css'
import Link from 'next/link'
import { db } from '@/db'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import path from 'path'
import ImageCreator from '@/components/imageCreator/ImageCreator'

export default function NewEntry() {
    // async function createImage(formData: FormData) {
    //     // This needs to be a server action
    //     'use server'

    //     // check the inputs
    //     const title = formData.get('imageTitle') as string
    //     const content = formData.get('imageDescription') as string
    //     const date = formData.get('imageDate')?.toLocaleString() as string
    //     const place = formData.get('imagePlace') as string

    //     const fileInput = formData.get('upload') as File

    //     if (!fileInput) {
    //         console.error('No file selected')
    //         return
    //     }

    //     // Validate file extension
    //     const allowedExtensions = ['.jpg', '.jpeg', '.png']
    //     const fileExtension = path.extname(fileInput.name).toLowerCase()
    //     if (!allowedExtensions.includes(fileExtension)) {
    //         console.error('Invalid file extension')
    //         return
    //     }

    //     // Validate file size
    //     const maxSizeInBytes = 5 * 1024 * 1024 // 10MB
    //     if (fileInput.size > maxSizeInBytes) {
    //         console.error('File size exceeds the limit')
    //         return
    //     }

    //     // Convert the file data to a Buffer
    //     const buffer = Buffer.from(await fileInput.arrayBuffer())
    //     const filename = fileInput.name.replaceAll(' ', '_')
    //     const filePath = 'public/assets/' + filename

    //     const imagePath = '/assets/' + filename

    //     try {
    //         // Write the file to the specified directory (public/assets) with the modified filename
    //         await writeFile(path.join(process.cwd(), filePath), buffer)
    //         console.log('upload done')
    //         // Return a JSON response with a success message and a 201 status code
    //     } catch (error) {
    //         // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    //         console.log('Error occurred ', error)
    //     }

    //     // create a new record in the db
    //     const image = await db.image.create({
    //         data: {
    //             title,
    //             imagePath,
    //             content,
    //             date,
    //             place,
    //             // galleries
    //         },
    //     })
    //     // Redirect the user to the admin page
    //     redirect('/admin')
    //     // confirmation modal + erase the form
    // }

    interface FileData {
        fileInput: File;
        filePath: string;
    }
    
        async function addImageInFolder(filedata: FileData) {
        // This needs to be a server action
        'use server'





        // Convert the file data to a Buffer
        const buffer = Buffer.from(await filedata.fileInput.arrayBuffer())
   

        try {
            // Write the file to the specified directory (public/assets) with the modified filename
            await writeFile(path.join(process.cwd(), filedata.filePath), buffer)
            console.log('upload done')
            // Return a JSON response with a success message and a 201 status code
        } catch (error) {
            // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
            console.log('Error occurred ', error)
        }
   }
    return (
        <>
            <h2>Créer une image</h2>
            
            <ImageCreator addImageInFolder={addImageInFolder}/>
            <br />
            <Link href="/admin">Admin panel</Link>
            <br />
            <Link href="/">Accueil</Link>
        </>
    )
}
