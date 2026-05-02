import express, { Request, Response } from 'express';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';

// Load the secret token from the .env file
dotenv.config();

const app = express();

// Allow your Vite frontend to talk to this backend
app.use(cors());

// Use memory storage so the ZIP file doesn't save to your hard drive
const upload = multer({ storage: multer.memoryStorage() });

// The endpoint your React app will call
app.post('/api/deploy', upload.single('storeZip'), async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Safety check: Did the file actually arrive?
    if (!req.file) {
      res.status(400).json({ success: false, message: 'No ZIP file was uploaded.' });
      return;
    }

    const zipBuffer = req.file.buffer;
    const netlifyToken = process.env.NETLIFY_TOKEN;

    // 2. Safety check: Is the token missing?
    if (!netlifyToken) {
      res.status(500).json({ success: false, message: 'Server configuration error: Missing Netlify token.' });
      return;
    }

    // 3. Grab the requested site name from the query parameters (e.g., ?name=my-store)
    const customSiteName = req.query.name;
    const netlifyApiUrl = customSiteName 
      ? `https://api.netlify.com/api/v1/sites?name=${customSiteName}` 
      : 'https://api.netlify.com/api/v1/sites';

    // 4. Send the ZIP to Netlify
    const response = await axios.post(
      netlifyApiUrl,
      zipBuffer,
      {
        headers: {
          'Content-Type': 'application/zip',
          'Authorization': `Bearer ${netlifyToken}`
        }
      }
    );

    // 5. Grab the live URL from Netlify's response
    const liveUrl = response.data.ssl_url;

    // 6. Send it back to the React frontend
    res.status(200).json({
      success: true,
      liveUrl: liveUrl
    });

  } catch (error: any) {
    // If Netlify throws an error (like "name already taken"), we catch it here
    const errorMessage = error.response?.data?.message || error.message;
    console.error('Deployment error:', errorMessage);
    
    // We send a 400 error back to the frontend with the specific message so the user knows what happened
    res.status(400).json({ 
        success: false, 
        message: errorMessage 
    });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 UrStore TypeScript Server running on http://localhost:${PORT}`);
});