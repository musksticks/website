// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

// Handle all GET requests
app.get('*', (req, res) => {
    const subdomain = req.subdomains[0]; // Get the subdomain

    // Serve the appropriate HTML file based on the subdomain
    if (subdomain === 'musk') {
        res.sendFile(path.join(__dirname, 'index.html'));
    } else if (subdomain === 'wiki') {
        res.sendFile(path.join(__dirname, 'wiki.html'));
    } else {
        res.sendFile(path.join(__dirname, 'index.html')); // Fallback
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
