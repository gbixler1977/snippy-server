require('dotenv').config();
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Snippy Server is running!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Snippy backend running on port 3000');
});
