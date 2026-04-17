import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API route to handle audit form submissions
app.post('/api/audit', async (req, res) => {
  const data = req.body;
  
  console.log('Received audit request:', data);

  // If a Google Sheets Webhook is provided in .env, forward the data
  const gsheetWebhook = process.env.GSHEET_WEBHOOK_URL;
  
  if (gsheetWebhook) {
    try {
      const response = await fetch(gsheetWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        console.error('Failed to update Google Sheet:', await response.text());
      } else {
        console.log('Google Sheet updated successfully');
      }
    } catch (err) {
      console.error('Error forwarding to Google Sheet:', err);
    }
  } else {
    console.warn('GSHEET_WEBHOOK_URL not set in .env. Submission saved locally only.');
  }

  res.status(200).json({ success: true, message: 'Audit request received successfully' });
});

// Serve frontend if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  // Simple check for development mode
  app.get('/', (req, res) => {
    res.send('KenganAutomation API is running. Start the frontend server with "npm run dev".');
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
