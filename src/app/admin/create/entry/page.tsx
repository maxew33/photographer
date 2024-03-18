import React from 'react'
import styles from '../Create.module.css'
import Link from 'next/link'
import { db } from '@/db'

export default function NewEntry() {
    async function createImage(formData: FormData) {
        // This needs to be a server action
        'use server'

        // check the inputs
        const title = formData.get('imageTitle') as string
        const path = formData.get('imagePath') as string
        const content = formData.get('imageDescription') as string
        const date = formData.get('imageDate')?.toLocaleString() as string
        const place = formData.get('imagePlace') as string
        // const galleries = formData.get('imageGalleries') as [string]

        // create a new record in the db
        const image = await db.image.create({
            data: {
                title,
                path,
                content,
                date,
                place,
                // galleries
            },
        })

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
                <button type="submit">submit</button>
            </form>
            <br />
            <Link href="/admin">Admin panel</Link>
            <br />
            <Link href="/">Accueil</Link>
        </>
    )
}
