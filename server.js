const express = require('express');
const app = express();
const port = 3000;

const productData = [
    { "productName": "Portable Garden System", "price": "$49.99", "stock": "Available" },
    { "productName": "Solar Powered Water Fountain", "price": "$79.99", "stock": "Out of Stock" },
    { "productName": "Outdoor Patio Heater", "price": "$119.99", "stock": "Available" },
    { "productName": "Portable Fire Pit", "price": "$129.99", "stock": "Available" },
    { "productName": "Garden Tool Set", "price": "$29.99", "stock": "Available" },
    { "productName": "LED Garden Lights", "price": "$39.99", "stock": "Out of Stock" },
    { "productName": "Outdoor Barbecue Grill", "price": "$199.99", "stock": "Available" },
    { "productName": "Garden Bench", "price": "$99.99", "stock": "Available" },
    { "productName": "Bird Feeder", "price": "$19.99", "stock": "Out of Stock" },
    { "productName": "Garden Sprinkler", "price": "$24.99", "stock": "Available" }
];

app.get('/products', (req, res) => {
    res.json(productData);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});









