import express, { json } from 'express';
// import axios from 'axios';
const app = express();
const PORT = process.env.PORT || 3002;

app.use(json());

app.get('/', (req, res) => {
  res.send('Api Working');
});

app.get('/files/data', async (req, res) => {
  try {
    res.json({ message: 'Aquí irán los datos procesados.' });
  } catch (error) {
    console.error('Error al procesar los datos:', error.message);
    res.status(500).json({ error: 'Error al procesar los datos' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
