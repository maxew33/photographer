'use server'

import { writeFile, access, unlink } from 'fs/promises'
import path from 'path';

// ======== Image services ========= //

interface FileData {
    fileInput: File;
    filePath: string;
}

export async function uploadImage(imageData : FileData) {
    console.log(imageData)
     try {
        const buffer = Buffer.from(await imageData.fileInput.arrayBuffer())
        // Write the file to the specified directory (public/assets) with the modified filename
        await writeFile(path.join(process.cwd(), imageData.filePath), buffer)
        console.log('upload done')
    } catch (error) {
        // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
        console.log('Error occurred ', error)
    }   
}