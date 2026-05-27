const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 5000;
const products = require('./product');

app.use(express.json());
app.use(cors()); // This opens the door for your frontend app to connect!
// A basic route to test if the server works
app.get('/', (req, res) => {
    res.send('Hello, your backend server is officially alive and running!');
});

// Fetch all products
app.get('/api/products', (req, res) => {
    console.log(`Products fetched successfully.`);
    res.json(products);
});

// Fetch a single product by ID
app.get('/api/products/:id', (req, res) => {
    const Product_Id = Number(req.params.id);
    const singleProduct = products.find(p=> p.id === Product_Id);
    
    if (!singleProduct) {
        console.log(`⚠️ Error: Product with ID ${id} not found.`);
        return res.status(404).json({ message: `Product with ID ${Product_Id} not found` });
    }
    
    console.log(`✨ Product with ID-${id} fetched successfully.`);
    res.json(singleProduct);
});

// Create a new product
app.post('/api/products', (req, res) => {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
        console.log("🚫 Invalid Post Request. Please Provide name, price, and category of product!");
        return res.status(400).json({ message: "Provide name, price, and category of product!" });
    }

    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
        name: name,
        price: Number(price),
        category: category
    };
    
    products.push(newProduct);

    console.log(`➕ Product added Successfully with Id-${newProduct.id}`);
    res.status(201).json({ message: 'Product added successfully', data: newProduct });
});

// Update an existing product
app.put('/api/products/:id', (req, res) => {
    const Product_Id = Number(req.params.id);
    const { name, price, category } = req.body;
    const ProductIndex = products.findIndex(p => p.id === Product_Id);

    if (ProductIndex === -1) {
        console.log(`⚠️ Update Failed: Product with ID ${Product_Id} does not exist.`);
        return res.status(404).json({ message: `Product with ID ${Product_Id} not found.` });
    }

    products[ProductIndex] = {
        id: Product_Id,
        name: name || products[ProductIndex].name,
        price: price ? Number(price) : products[ProductIndex].price,
        category: category || products[ProductIndex].category
    };

    console.log(`🔄 Product ID ${Product_Id} updated successfully.`);
    res.json({
        message: `Product with ${Product_Id} updated successfully`,
        data: products[ProductIndex]
    });
});

// Delete a product
app.delete('/api/products/:id', (req, res) => {
    const product_Id = Number(req.params.id);
    const productIndex = products.findIndex(p => p.id === product_Id);

    if (productIndex === -1) {
        console.error(`⚠️ Delete Failed: Product with ID-${product_Id} not found.`);
        return res.status(404).json({ message: `Product with ID-${product_Id} not found.` });
    }

    const deletedProduct = products.splice(productIndex, 1);
    console.log(`🗑️ Successfully deleted ID ${product_Id}`);

    res.json({
        message: `Product with ID-${product_Id} deleted successfully`,
        data: deletedProduct[0]
    });
});

// Start listening for web requests
app.listen(PORT, () => {
    const bootTime = new Date();
     // Returns HH:MM:SS format safely
    const formattedTime = bootTime.toTimeString().split(' ')[0];
    
    console.log(`Server started at --- ${formattedTime}`);
    console.log(`🚀 Server is listening dynamically on - http://localhost:${PORT}`);
});