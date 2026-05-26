const express = require('express');
const app = express();
const PORT = 5000;

// A basic route to test if the server works
app.get('/', (req, res) => {
 app.get('/', (req, res) => {
    // Both lines sent together in ONE response
    res.send('Hello, your backend server is officially alive and running!<br>I am Brandi Love');
});
});

// Start listening for web requests
app.listen(PORT, () => {
    console.log(`🚀 Server is listening dynamically on- http://localhost:${PORT}`);
    
});
