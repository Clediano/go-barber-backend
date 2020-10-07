import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tmpFolter = path.resolve(__dirname, '..', '..', 'tmp');

export default {
    directory: tmpFolter,
    storage: multer.diskStorage({
        destination: tmpFolter,
        filename: (req, file, callback) => {
            const fileHash = crypto.randomBytes(10).toString('hex');
            const fileName = `${fileHash}-${file.originalname}`;

            return callback(null, fileName);
        },
    }),
};
