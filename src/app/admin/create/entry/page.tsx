import React from 'react'
import styles from '../Create.module.css'
import Link from 'next/link'
import { db } from '@/db'
import { redirect } from 'next/navigation'
import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export default function NewEntry() {
    async function createImage(formData: FormData) {
        // This needs to be a server action
        'use server'

        // check the inputs
        const title = formData.get('imageTitle') as string
        const imagePath = formData.get('imagePath') as string
        const content = formData.get('imageDescription') as string
        const date = formData.get('imageDate')?.toLocaleString() as string
        const place = formData.get('imagePlace') as string
        // const galleries = formData.get('imageGalleries') as [string]

        const fileInput = formData.get('upload') as File

        if (fileInput) {
           
            // Convert the file data to a Buffer
            const buffer = Buffer.from(await fileInput.arrayBuffer())
            const filename = fileInput.name.replaceAll(' ', '_')
            console.log(filename, buffer)
            try {
                console.log('here i am')
                // Write the file to the specified directory (public/assets) with the modified filename
                await writeFile(
                    path.join(process.cwd(), 'public/assets/' + filename),
                    buffer
                )
                console.log('upload done')
                // Return a JSON response with a success message and a 201 status code
            } catch (error) {
                console.log('merde')
                // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
                console.log('Error occurred ', error)
            }
        } else {
            // no file provided
        }

        // create a new record in the db
        const image = await db.image.create({
            data: {
                title,
                imagePath,
                content,
                date,
                place,
                // galleries
            },
        })
        // Redirect the user to the admin page
        redirect('/admin')
        // confirmation modal + erase the form
    }
    return (
        <>
            <h2>Créer une image</h2>
            <form className={styles.form} action={createImage}>
                <label htmlFor="imageTitle">Nom de l'image :</label>
                <input type="text" name="imageTitle" id="imageTitle" />
                <label htmlFor="imagePath">URL de l'image :</label>
                <input type="text" name="imagePath" id="imagePath" />
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
                <input type="file" name="upload" id="upload" />
                <button type="submit">submit</button>
            </form>
            <br />
            <Link href="/admin">Admin panel</Link>
            <br />
            <Link href="/">Accueil</Link>
        </>
    )
}
