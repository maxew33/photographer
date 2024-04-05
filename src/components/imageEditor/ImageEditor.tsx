'use client'

import React, { useEffect, useState } from 'react'
import type { Picture } from '@prisma/client'
import * as action from '@/actions'
import Image from 'next/image'

interface PictureProps {
    picture: Picture
}

export default function ImageEditor({ picture }: PictureProps) {
    const [imageSize, setImageSize] = useState({ height: 0, width: 0 })
    const [sizeGotten, setSizeGotten] = useState(false)

    useEffect(() => {
        if (!picture.path) return // Vérifier si picture.path est défini

        const getImageDimensions = async () => {
            try {
                // Récupérer l'image sous forme de Blob à partir de l'URL
                const response = await fetch(picture.path)
                const blob = await response.blob()

                // Utiliser FileReader pour obtenir les dimensions de l'image
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
                            setImageSize({
                                height,
                                width,
                            })
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

    return (
        <>
            Image editor
            {sizeGotten && (
                <Image
                    src={picture.path}
                    alt=""
                    width={imageSize.width}
                    height={imageSize.height}
                />
            )}
        </>
    )
}
