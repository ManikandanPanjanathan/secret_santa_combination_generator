const fs = require('fs');
const { Parser } = require('json2csv');

const writeCSV = (data, filePath) => {
    const parser = new Parser();
    const csv = parser.parse(data);
    fs.writeFileSync(filePath, csv);
};

module.exports = { writeCSV };