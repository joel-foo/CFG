const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8888;
const MONGODB_URL = process.env.DATABASE_URL;

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App listening on Port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('error');
  });
