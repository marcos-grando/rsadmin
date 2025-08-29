import cloudinary from '../clients/cloudinaryClient.server.js';
import { Readable } from 'stream';

export function uploadImage(buffer, folder = 'default') {
    return new Promise((resolve, reject) => {

        const fullFolder = `rscorretora/${folder}`
        const stream = cloudinary.uploader.upload_stream(
            { folder: fullFolder },
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