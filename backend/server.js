const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');
const dotenv = require('dotenv');

const productRoute = require('./routes/api/productRoute');

// Load environment variables
dotenv.config();

// Connecting to the Database
async function connectdb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
}

connectdb();

// Initializing express
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors middleware
//app.use(cors());

// Use Route
app.use('/api/products', productRoute);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});
