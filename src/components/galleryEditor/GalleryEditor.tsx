'use client'

import React, { useState } from 'react'
import type { Gallery } from '@prisma/client'
import * as action from '@/actions'

interface GalleryProps {
    gallery: Gallery
}

export default function GalleryEditor({ gallery }: GalleryProps) {
    const [updatedGallery, setUpdatedGallery] = useState(gallery)

    const editGalleryAction = action.editGallery.bind(
        null,
        updatedGallery.id,
        updatedGallery
    )

    const changeTitle = (e: { target: { value: string } }) => {
        setUpdatedGallery({ ...updatedGallery, title: e.target.value })
    }

    const deleteGallery = () => {
        action.deleteGallery(gallery.id)
    }

    return (
        <>
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
                <br />
                <button type="submit">submit</button>
            </form>
            <br />
            <button onClick={deleteGallery}>delete</button>
        </>
    )
}
