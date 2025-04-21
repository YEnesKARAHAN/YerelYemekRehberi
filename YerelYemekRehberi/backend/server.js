const express = require('express');
const cors = require('cors');
const { sql, config } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query('SELECT * FROM Users');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('API 3000 portunda çalışıyor.'));
