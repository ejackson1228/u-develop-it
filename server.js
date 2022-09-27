const express = require('express');
const PORT = process.env.PORT || 3001;

const db = require('./db/connection');
const app = express();
const apiRoutes = require('./routes/apiRoutes');

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// use api routes
app.use('/api', apiRoutes);

// catchall route. default response for any other request (not found) ** must be last route in script placement
app.use((req, res) => {
    res.status(404).end();
});

// Start server after DB connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
