const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        const name = file.fieldname === 'current' ? 'current.csv' : 'previous.csv';
        cb(null, name);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedMime = 'text/csv';
    const ext = path.extname(file.originalname).toLowerCase();

    if (file.mimetype === allowedMime && ext === '.csv') {
        cb(null, true);
    } else {
        cb(new Error('Only CSV files are allowed!'), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
