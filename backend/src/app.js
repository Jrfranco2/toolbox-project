import express, { json } from 'express';
import axios from 'axios';
import { API_URL, API_KEY } from './utils/constants.js';
const app = express();
const PORT = process.env.PORT || 3002;

app.use(json());

app.get('/', (_, res) => {
  res.send('Api Working');
});

app.get('/files/data', async (req, res) => {
  try {
    const filesResponse = await axios.get(`${API_URL}/files`, {
      headers: { Authorization: API_KEY },
    });

    const files = filesResponse.data.files;

    res.json(files);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    return res.status(statusCode).json({
      error: error.message ? error.message : 'Error processing request',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
