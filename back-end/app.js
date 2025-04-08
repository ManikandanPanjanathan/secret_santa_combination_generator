const express = require("express");
const path = require('path');
const fs = require("fs")
const cors = require('cors');
const csvRoutes = require("./routes/csvRoutes")
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));

const folders = ['uploads', 'downloads', 'outputs'];

folders.forEach(folder => {
    const dirPath = path.join(process.cwd(), folder);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Created folder: ${folder}`);
    }
});

app.use('/api/santa', csvRoutes);
app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});