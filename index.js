const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
const { initializeDatabase } = require('./config/db');
const schoolRoutes = require('./routes/schoolValidator');



app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', schoolRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});