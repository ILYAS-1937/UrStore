import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// 1. Enable CORS so your Netlify frontend can talk to this backend
app.use(cors());

// 2. Configure multer to store the uploaded ZIP file in memory temporarily
const upload = multer({ storage: multer.memoryStorage() });

// 3. The Deployment Route
app.post('/api/deploy', upload.single('storeZip'), async (req, res): Promise<any> => {
  try {
    const siteName = req.query.name as string;
    const fileBuffer = req.file?.buffer;

    if (!fileBuffer) {
      return res.status(400).json({ success: false, message: 'No zip file provided' });
    }

    // Send the ZIP file buffer directly to Netlify's API
    const response = await axios.post(
      `https://api.netlify.com/api/v1/sites`,
      fileBuffer,
      {
        headers: {
          'Content-Type': 'application/zip',
          'Authorization': `Bearer ${process.env.NETLIFY_TOKEN}` // Uses your token
        },
        params: {
          name: siteName // Netlify will try to use this exact name for the subdomain
        }
      }
    );

    // If successful, send the live URL back to the React frontend
    res.json({
      success: true,
      liveUrl: response.data.ssl_url || response.data.url
    });

  } catch (error: any) {
    console.error('Deployment error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to deploy to Netlify. The name might be taken or the token is invalid.' 
    });
  }
});

// 4. Listen on the dynamic port provided by the host (like Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});