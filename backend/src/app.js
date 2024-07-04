import express, { json } from 'express';
import cors from 'cors';
import axios from 'axios';
import { API_URL, API_KEY } from './utils/constants.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(json());

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.get('/', cors(corsOptions), (_, res) => {
  res.send('Api Working');
});

app.get('/files/data', cors(corsOptions), async (req, res) => {
  const { fileName } = req.query;

  if (fileName) {
    try {
      const fileDataResponse = await axios.get(`${API_URL}/file/${fileName}`, {
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
          file: columns[0],
          text: columns[1],
          number: parseInt(columns[2]),
          hex: columns[3],
        }));

      return res.json({ file: fileName, lines });
    } catch (error) {
      const statusCode = error.response ? error.response.status : 500;

      if (statusCode === 404) {
        return res
          .status(404)
          .json({ status: 404, message: `Filename: ${fileName} not found` });
      }

      return res.status(statusCode).json({
        error: error.message ? error.message : 'Error fetching file data',
      });
    }
  } else {
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
                columns.length === 4 &&
                columns.every((col) => col.trim() !== '')
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
  }
});

app.get('/files/list', cors(corsOptions), async (req, res) => {
  try {
    const filesResponse = await axios.get(`${API_URL}/files`, {
      headers: { Authorization: API_KEY },
    });

    res.json(filesResponse.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    return res.status(statusCode).json({
      error: error.message ? error.message : 'Error fetching file list',
    });
  }
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export { app };
