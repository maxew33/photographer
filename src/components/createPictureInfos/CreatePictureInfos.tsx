'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import type { Picinfos, Picture } from '@prisma/client'
import * as action from '@/actions'
import Image from 'next/image'

interface PictureProps {
    picture: Picture
}

export default function SetPictureInfos({ picture }: PictureProps) {
    const [sizeGotten, setSizeGotten] = useState(false)
    const [picInfos, setPicInfos] = useState({
        title: '',
        content: '',
        date: '',
        place: '',
        pictureId: picture.id,
        height: 0,
        width: 0,
    })

    // get the size of the picture
    useEffect(() => {
        if (!picture.path) return // check if picture.path is defined

        const getImageDimensions = async () => {
            try {
                // get the picture as a Blob from URL
                const response = await fetch(picture.path)
                const blob = await response.blob()

                // Use FileReader to get the size
                const reader = new FileReader()
                reader.readAsDataURL(blob)
                reader.onload = (event) => {
                    if (
                        event.target &&
                        typeof event.target.result === 'string'
                    ) {
                        const img = document.createElement('img')
                        img.src = event.target.result
                        img.onload = () => {
                            const width = img.width
                            const height = img.height
                            setPicInfos({ ...picInfos, height, width })
                            setSizeGotten(true)
                        }
                    }
                }
            } catch (error) {
                console.error("Erreur lors du chargement de l'image:", error)
            }
        }

        getImageDimensions()
    }, [picture.path])

    console.log(picInfos)

    async function AddPicInfos() {

        //if there is a date turn it into a string
        const date = picInfos.date
            ? (picInfos.date.toLocaleString() as string)
            : ''

        const data = {
            ...picInfos,
            date,
        }
        console.log(data)

        const createInfosAction = action.createPictureInfos(data)
    }

    const updateForm = (
        e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        entryKey: keyof Picinfos
    ) => {
        setPicInfos({
            ...picInfos,
            [entryKey]: e.currentTarget.value,
        })
    }

    return (
        <>
            {sizeGotten && (
                <Image
                    src={picture.path}
                    alt=""
                    width={picInfos.width}
                    height={picInfos.height}
                />
            )}

            <form action={AddPicInfos}>
                <label htmlFor="imageTitle">Nom de l'image :</label>
                <input
                    type="text"
                    name="imageTitle"
                    id="imageTitle"
                    onChange={(e) => updateForm(e, 'title')}
                    value={picInfos.title}
                />
                <label htmlFor="imageDescription">
                    Description de l'image id:
                </label>
                <textarea
                    name="imageDescription"
                    id="imageDescription"
                    value={picInfos.content}
                    onChange={(e) => updateForm(e, 'content')}
                />
                <label htmlFor="imagePlace">Localisation :</label>
                <input
                    type="text"
                    name="imagePlace"
                    id="imagePlace"
                    value={picInfos.place}
                    onChange={(e) => updateForm(e, 'place')}
                />

                <label htmlFor="imageDate">Date de la prise de vue :</label>
                <input
                    type="date"
                    name="imageDate"
                    id="imageDate"
                    value={picInfos.date}
                    onChange={(e) => updateForm(e, 'date')}
                />
                <button type="submit">submit</button>
            </form>
            <br />
            {/* <form action={deleteImage}>
                <button type="submit">delete</button>
            </form> */}
        </>
    )
}
