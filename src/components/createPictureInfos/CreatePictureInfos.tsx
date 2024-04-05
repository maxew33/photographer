'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import type { Picinfos, Picture } from '@prisma/client'
import * as action from '@/actions'
import Image from 'next/image'
import { db } from '@/db'

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
        picturePath: picture.path,
        pictureId: picture.id,
        height: 0,
        width: 0,
    })


    // get the size of the picture
    useEffect(() => {

        async() =>{
            const entry = await db.picinfos.findFirst({
                where: {
                    pictureId: picture.id,
                },
            })

        }
        

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
            <h1>Ajouter des informations à l'image: </h1>
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

// 'use client'

// import React, { FormEvent, useEffect, useState } from 'react'
// import type { Picinfos, Picture } from '@prisma/client'
// import * as action from '@/actions'
// import Image from 'next/image'
// import { db } from '@/db'

// interface PictureProps {
//     picture: Picture
// }

// export default function SetPictureInfos({ picture }: PictureProps) {
//     const [sizeGotten, setSizeGotten] = useState(false)
//     const [isInDB, setIsInDB] = useState(false)
//     const [picInfos, setPicInfos] = useState({
//         id: 0,
//         title: '',
//         content: '',
//         date: '',
//         place: '',
//         picturePath: picture.path,
//         pictureId: picture.id,
//         height: 0,
//         width: 0,
//     })

//     useEffect(() => {
//         const getPicInfos = async () => {
//             try {
//                 // Vérifier si les données existent déjà dans la base de données
//                 const entry = await db.picinfos.findFirst({
//                     where: {
//                         pictureId: picture.id,
//                     },
//                 })

//                 if (entry) {
//                     // Si les données existent déjà, les mettre à jour dans l'état local
//                     setPicInfos({
//                         id: entry.id,
//                         title: entry.title as string,
//                         content: entry.content as string,
//                         date: entry.date as string,
//                         place: entry.place as string,
//                         picturePath: entry.picturePath,
//                         pictureId: entry.pictureId,
//                         height: entry.height,
//                         width: entry.width,
//                     })
//                     setSizeGotten(true)
//                     setIsInDB(true)
//                 } else {
//                     // Si les données n'existent pas, récupérer les dimensions de l'image
//                     getImageDimensions()
//                 }
//             } catch (error) {
//                 console.error(
//                     "Erreur lors de la récupération des informations de l'image:",
//                     error
//                 )
//             }
//         }

//         getPicInfos()

//         const getImageDimensions = async () => {
//             try {
//                 // get the picture as a Blob from URL
//                 const response = await fetch(picture.path)
//                 const blob = await response.blob()

//                 // Use FileReader to get the size
//                 const reader = new FileReader()
//                 reader.readAsDataURL(blob)
//                 reader.onload = (event) => {
//                     if (
//                         event.target &&
//                         typeof event.target.result === 'string'
//                     ) {
//                         const img = document.createElement('img')
//                         img.src = event.target.result
//                         img.onload = () => {
//                             const width = img.width
//                             const height = img.height
//                             setPicInfos({ ...picInfos, height, width })
//                             setSizeGotten(true)
//                         }
//                     }
//                 }
//             } catch (error) {
//                 console.error("Erreur lors du chargement de l'image:", error)
//             }
//         }
//     }, [picture.id, picture.path])

//     console.log(picInfos)

//     async function AddPicInfos() {
//         //if there is a date turn it into a string
//         const date = picInfos.date
//             ? (picInfos.date.toLocaleString() as string)
//             : ''

//         const data = {
//             ...picInfos,
//             date,
//         }

//         const { id, ...dataWithoutId } = data;
//         console.log(data)

//         const InfosAction = isInDB ? action.updatePictureInfos.bind(null, data.id, data) : action.createPictureInfos(dataWithoutId)
//     }

//     const updateForm = (
//         e: FormEvent<HTMLInputElement | HTMLTextAreaElement>,
//         entryKey: keyof Picinfos
//     ) => {
//         setPicInfos({
//             ...picInfos,
//             [entryKey]: e.currentTarget.value,
//         })
//     }

//     return (
//         <>
//             <h1>{isInDB ? "mise à jour des entrées" : "Ajouter des informations à l'image:"} </h1>
//             {sizeGotten && (
//                 <Image
//                     src={picture.path}
//                     alt=""
//                     width={picInfos.width}
//                     height={picInfos.height}
//                 />
//             )}

//             <form action={AddPicInfos}>
//                 <label htmlFor="imageTitle">Nom de l'image :</label>
//                 <input
//                     type="text"
//                     name="imageTitle"
//                     id="imageTitle"
//                     onChange={(e) => updateForm(e, 'title')}
//                     value={picInfos.title}
//                 />
//                 <label htmlFor="imageDescription">
//                     Description de l'image id:
//                 </label>
//                 <textarea
//                     name="imageDescription"
//                     id="imageDescription"
//                     value={picInfos.content}
//                     onChange={(e) => updateForm(e, 'content')}
//                 />
//                 <label htmlFor="imagePlace">Localisation :</label>
//                 <input
//                     type="text"
//                     name="imagePlace"
//                     id="imagePlace"
//                     value={picInfos.place}
//                     onChange={(e) => updateForm(e, 'place')}
//                 />

//                 <label htmlFor="imageDate">Date de la prise de vue :</label>
//                 <input
//                     type="date"
//                     name="imageDate"
//                     id="imageDate"
//                     value={picInfos.date}
//                     onChange={(e) => updateForm(e, 'date')}
//                 />
//                 <button type="submit">submit</button>
//             </form>
//             <br />
//             {/* <form action={deleteImage}>
//                 <button type="submit">delete</button>
//             </form> */}
//         </>
//     )
// }
