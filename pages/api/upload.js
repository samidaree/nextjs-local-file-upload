import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname.replace(/\s/, ""));
    }
});

const upload = multer({
    storage
});

export default async function handler(req, res) {
    try {
        await upload.single('file')(req, res, function (err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to upload file' });
            }

            const imageUrl = `/uploads/${req.file.filename}`;
            return res.status(200).json({ imageUrl });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to upload file' });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};