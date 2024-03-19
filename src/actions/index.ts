'use server'

import { db } from "@/db"
import type { Gallery } from '@prisma/client'
import { redirect } from 'next/navigation'

export async function editGallery(id: number, updatedGallery: Gallery) {
    await db.gallery.update({
        where: {id},
        data: updatedGallery
    })

    console.log('gallery edited', updatedGallery)

    redirect('/admin')
}

export async function deleteGallery(id: number){
    await db.gallery.delete({
        where: {id}
    })

    redirect('/admin')
}