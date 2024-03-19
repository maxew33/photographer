'use client'

import React, { useState } from 'react'
import type { Gallery } from '@prisma/client'
import { editGallery } from '@/actions'

interface GalleryProps {
    gallery: Gallery
}

export default function GalleryEditor({ gallery }: GalleryProps) {
    const [updatedGallery, setUpdatedGallery] = useState(gallery)

    console.log(updatedGallery)

    const editGalleryAction = editGallery.bind(null, updatedGallery.id, updatedGallery)

    const changeTitle = (e: { target: { value: string } }) => {
        setUpdatedGallery({ ...updatedGallery, title: e.target.value })
    }

    return (
        <>
            <div>GalleryEditor : {gallery.title} </div>
            <br />
            <form action={editGalleryAction}>
                <label htmlFor="galleryTitle">Nom de la galerie :</label>
                <input
                    type="text"
                    name="galleryTitle"
                    id="galleryTitle"
                    value={updatedGallery.title}
                    onChange={changeTitle}
                />
                <br />
                <label htmlFor="galleryIllus">
                    Image mise en avant de la galerie :
                </label>
                <select name="galleryIllus" id="galleryIllus"></select>
                <br />
                <button type="submit">submit</button>
            </form>
        </>
    )
}
