import cloudinary from '../clients/cloudinaryClient.server.js';
import { Readable } from 'stream';

function randomString(len = 10) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length: len }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
    ).join('');
}

export function uploadImage(buffer, folder = 'default', originalname = 'file') {
    return new Promise((resolve, reject) => {

        const fullFolder = `rscorretora/${folder}`

        const base = originalname.replace(/\.[^/.]+$/, '');
        const public_id = `${randomString()}_${base}`;

        const stream = cloudinary.uploader.upload_stream(
            { folder: fullFolder, public_id },
            (err, result) => {
                if (err) return reject(err);
                resolve({ url: result.secure_url, public_id: result.public_id });
            }
        );
        Readable.from(buffer).pipe(stream);
    });
};

export async function deleteImage(public_id) {
    if (!public_id) return;
    try {
        await cloudinary.uploader.destroy(public_id);
    } catch (e) {
        console.error('cloudinary destroy error', public_id, e?.message);
    };
};