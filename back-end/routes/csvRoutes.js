const express = require('express');
const { generateCSV } = require('../controllers/csvController');
const { upload } = require('../utils/multerConfig');

const router = express.Router();

router.post(
    '/upload',
    upload.fields([
        { name: 'current', maxCount: 1 },
        { name: 'previous', maxCount: 1 },
    ]),
    generateCSV
);

module.exports = router;