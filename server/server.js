const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the client's dist folder
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Route handler for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
