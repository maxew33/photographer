'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import type { Picinfos } from '@prisma/client'
import * as action from '@/actions'
import Image from 'next/image'

interface InfosProps {
    infos: Picinfos
}

export default function SetPictureInfos({ infos }: InfosProps) {
    const [picInfos, setPicInfos] = useState({
        id: infos.id as number,
        title: infos.title as string,
        content: infos.content as string,
        place: infos.place as string,
        date: infos.date as string,
        picturePath: infos.picturePath,
        pictureId: infos.pictureId,
        width: infos.width as number,
        height: infos.height as number,
    })

    async function AddPicInfos() {
        console.log('form submitted')
        //if there is a date turn it into a string
        const date = picInfos.date
            ? (picInfos.date.toLocaleString() as string)
            : ''

        const data = {
            ...picInfos,
            date,
        }
        console.log(data)

        const updateInfosAction = action.updatePictureInfos(
            data.id,
            data
        )
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

    useEffect(() => {
        console.log(picInfos)
    }, [picInfos])

    return (
        <>
            <h1>Mettre à jour les informations de l'image: </h1>

            <Image
                src={picInfos.picturePath}
                alt=""
                width={picInfos.width}
                height={picInfos.height}
            />

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
