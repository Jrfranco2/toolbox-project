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

    const filePromises = files.map(async (file) => {
      try {
        const fileDataResponse = await axios.get(`${API_URL}/file/${file}`, {
          headers: { Authorization: API_KEY },
        });

        const lines = fileDataResponse.data
          .split('\n')
          .slice(1)
          .map((line) => line.split(','))
          .filter(
            (columns) =>
              columns.length === 4 && columns.every((col) => col.trim() !== '')
          )
          .map((columns) => ({
            text: columns[1],
            number: parseInt(columns[2]),
            hex: columns[3],
          }));

        return { file, lines };
      } catch (error) {
        console.error(`Error processing file: ${file}:`, error.message);
        return { file, lines: [] };
      }
    });

    const fileData = await Promise.allSettled(filePromises);

    res.json(fileData.map((result) => result.value));
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
