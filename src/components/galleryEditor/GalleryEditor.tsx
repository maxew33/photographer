'use client'

import React, { ChangeEventHandler, useState } from 'react'
import type { Gallery, Picinfos } from '@prisma/client'
import * as action from '@/actions'

interface GalleryProps {
    gallery: Gallery
    infos: Picinfos[]
}

export default function GalleryEditor(props: GalleryProps) {
    const { gallery, infos } = props

    console.log(infos)

    const [updatedGallery, setUpdatedGallery] = useState(gallery)

    const editGalleryAction = action.editGallery.bind(
        null,
        updatedGallery.id,
        updatedGallery
    )

    const changeTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
        setUpdatedGallery({ ...updatedGallery, title: e.target.value });
    }

    const changeFeaturedImage: ChangeEventHandler<HTMLSelectElement> = (e) => {
        const selectedImageId = parseInt(e.target.value);
        setUpdatedGallery({ ...updatedGallery, featuredImageId: selectedImageId });
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
                <select
                    name="galleryIllus"
                    id="galleryIllus"
                    value={updatedGallery.featuredImageId as number}
                    onChange={changeFeaturedImage}
                >
                    {infos.map((info) => (
                        <option
                            key={info.id}
                            value={info.id}
                            style={{ background: 'red' }}
                        >
                            {info.title ? info.title : 'no title'}
                        </option>
                    ))}
                </select>
                <br />
                <br />
                <button type="submit">submit</button>
            </form>
            <br />
            <button onClick={deleteGallery}>delete</button>
        </>
    )
}
