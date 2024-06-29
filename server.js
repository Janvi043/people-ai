// server.js

const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Multer setup for file upload handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to handle file upload
app.post('/upload', upload.single('videoFile'), (req, res) => {
  const uploadedFile = req.file;
  if (!uploadedFile) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully: ' + uploadedFile.originalname);
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
