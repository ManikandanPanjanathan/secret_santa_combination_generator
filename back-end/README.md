# Secret Santa Combination Generator Backend

## Description
This is the backend for a Secret Santa Combination Generator built with Node.js, Express, and Multer in an MVC architecture. It provides API for generate the combination by uploading the necessary files.

## Technologies Used
- Node.js
- Express.js
- Multer
- CSV

## Setup Instructions

### 1. Installation
Install dependencies - `npm install`

### 2. Configure Environment Variables
- `PORT=5000`

### 4. Start the Server
  `npm run server`
- The server runs on `http://localhost:5000`.

### Upload Files
- **POST /api/santa/upload**
  - URL: http://localhost:5000/api/santa/upload
  - Method: POST
  - Content-Type: multipart/form-data
  - Fields:
      - current: Current year employee list (CSV file)
      - previous: Last year’s Secret Santa assignments (CSV file)