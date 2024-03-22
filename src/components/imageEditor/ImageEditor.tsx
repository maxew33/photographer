'use client'

import React, { useState } from 'react'
import type { Image } from '@prisma/client'
import * as action from '@/actions'

interface ImageProps {
    image: Image
}

export default function GalleryEditor({ image }: ImageProps) {
    const [updatedImage, setUpdatedImage] = useState(image)

    const editImageAction = action.editImage.bind(
        null,
        updatedImage.id,
        updatedImage
    )

    const changeTitle = (e: { target: { value: string } }) => {
        setUpdatedImage({ ...updatedImage, title: e.target.value })
    }

    const deleteImage = () => {
        action.deleteImage(image.id)
    }

    return (
        <>
            <form action={editImageAction}>
                <label htmlFor="galleryTitle">Nom de l'image :</label>
                <input
                    type="text"
                    name="galleryTitle"
                    id="galleryTitle"
                    value={updatedImage.title ?? ''}
                    onChange={changeTitle}
                />
                <br />
                <label htmlFor="imageDescription">
                    Description de l'image :
                </label>
                <textarea name="imageDescription" id="imageDescription" />
                
                <label htmlFor="galleryIllus">
                    Image mise en avant de la galerie :
                </label>
                <select name="galleryIllus" id="galleryIllus"></select>
                <br />
                <br />
                <button type="submit">submit</button>
            </form>
            <br />
            <button onClick={deleteImage}>delete</button>
        </>
    )
}
