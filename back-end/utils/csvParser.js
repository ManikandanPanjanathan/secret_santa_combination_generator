const fs = require('fs');
const csv = require('csv-parser');

const parseCSV = (filePath) =>
    new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv({
                mapHeaders: ({ header }) => header.trim().replace('\uFEFF', '')
            }))
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });

module.exports = { parseCSV };
