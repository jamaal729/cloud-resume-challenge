// Simple Express server to handle view counts

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5174;

app.use(cors());
app.use(express.json());

let viewCount = 0;

app.post('/api/views', (req, res) => {
  viewCount += 1;
  res.json({ count: viewCount });
});

app.get('/api/views', (req, res) => {
  res.json({ count: viewCount });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});