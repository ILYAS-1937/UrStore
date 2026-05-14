import express from 'express';
import cors from 'cors';
import multer from 'multer';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Allow requests from your frontend
app.use(cors({
    origin: 'https://urstores.netlify.app', // Allow your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Use memory storage for Vercel serverless compatibility
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/api/deploy', upload.single('storeZip'), async (req, res) => {
  try {
    const siteName = req.query.name;
    const zipBuffer = req.file?.buffer;

    if (!zipBuffer) {
      res.status(400).json({ success: false, message: 'No zip file provided' });
      return;
    }

    // Push the zip buffer directly to Netlify's API
    const netlifyResponse = await axios.post(
      'https://api.netlify.com/api/v1/sites',
      zipBuffer,
      {
        headers: {
          'Content-Type': 'application/zip',
          Authorization: `Bearer ${process.env.NETLIFY_TOKEN}`,
        },
        params: {
          name: siteName, 
        },
      }
    );

    res.json({
      success: true,
      liveUrl: netlifyResponse.data.ssl_url || netlifyResponse.data.url,
      message: 'UrStore successfully deployed!',
    });
    
  } catch (error: any) {
    console.error('Deployment error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to deploy to Netlify. The name might be taken.',
    });
  }
});

// Only listen locally, Vercel will handle the exported app instance
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Required for Vercel Serverless Functions
export default app;