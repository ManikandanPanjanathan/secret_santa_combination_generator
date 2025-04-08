const path = require('path');
const { parseCSV } = require('../utils/csvParser');
const { writeCSV } = require('../utils/fileWriter');
const { getRandomPairings } = require('../services/csvService');

const generateCSV = async (req, res) => {
    try {
        const currentPath = path.join(__dirname, '../uploads/current.csv');
        const previousPath = path.join(__dirname, '../uploads/previous.csv');

        const employees = (await parseCSV(currentPath)).map((e, idx) => ({
            id: idx,
            ...e
        }));

        const previousAssignments = (await parseCSV(previousPath)).map((e, idx) => ({
            id: idx,
            ...e
        }));

        const assignments = getRandomPairings(employees, previousAssignments);

        const outputPath = path.join(
            __dirname,
            '../outputs/secret_santa_combination.csv'
        );
        writeCSV(assignments, outputPath);

        res.status(200).json({
            message: 'Secret Santa combinations generated!',
            download: '/outputs/secret_santa_combination.csv',
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Combination generation failed.' });
    }
};

module.exports = { generateCSV };