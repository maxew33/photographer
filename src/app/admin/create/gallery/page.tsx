import React from 'react'
import styles from '../Create.module.css'
import Link from 'next/link'
import { db } from '@/db'
import { redirect } from 'next/navigation'

export default async function NewGallery() {
    const infos = await db.picinfos.findMany()

    console.log(123, infos)

    async function createGallery(formData: FormData) {
        // This needs to be a server action
        'use server'

        // check the inputs
        const title = formData.get('galleryTitle') as string
        const featuredImageId = parseInt(formData.get('galleryIllus') as string)

        // create a new record in the db
        try {
            const gallery = await db.gallery.create({
                data: {
                    title,
                    featuredImageId,
                },
            })
            // confirmation modal + erase the form

            console.log(gallery, title, featuredImageId)
        } catch (err) {
            console.error(err)
        }

        // Redirect the user to the admin page
        redirect('/admin')
    }
    return (
        <>
            {infos.length === 0 ? (
                <>
                    <div>il faut d'abord ajouter des images</div>
                    <Link href="/admin/create/entry">Ajouter une image</Link>
                </>
            ) : (
                <>
                    <h2>Créer une galerie f</h2>
                    <form className={styles.form} action={createGallery}>
                        <label htmlFor="galleryTitle">
                            Nom de la galerie :
                        </label>
                        <input
                            type="text"
                            name="galleryTitle"
                            id="galleryTitle"
                        />
                        <label htmlFor="galleryIllus">
                            Image mise en avant de la galerie :
                        </label>
                        <select name="galleryIllus" id="galleryIllus">
                            {infos.map((info) => (
                                <option key={info.id} value={info.id} style={{background:'red'}}>{info.title ? info.title : 'no title'}</option>
                            ))}
                        </select>
                        <button type="submit">submit</button>
                    </form>
                </>
            )}

            <br />
            <Link href="/admin">Admin panel</Link>
            <br />
            <Link href="/">Accueil</Link>
        </>
    )
}
