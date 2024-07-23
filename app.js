const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const data = require('./data.json');
const {Product} = require('./schema/productSchema');
// Middleware to parse JSON request bodies
// get requst to get all data from DB
app.get('/api/v1/prodcuts', async (req, res) => {
    try {
        const findProducts = await Product.find();
        res.status(200).json({
            status: 'success',
            data: findProducts
        });
    } catch (error) {
        // Handle errors
        console.error('Error Finding products:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
});

// get data from DB by ID
app.get('/api/v1/prodcuts/:id',async (req,res)=>{
    try{
        const insertedProducts = await  Product.findById(req.params.id);
        if(insertedProducts == null){
            res.status(404).json({
                status: 'Product Not Found',
                data: insertedProducts
            });
        }
        // Send response
        else{
            res.status(200).json({
                status: 'success',
                data: insertedProducts
            });
        console.log(insertedProducts)
        }
    }catch(error){
        // Handle errors
        console.error('Error Finding product ById:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
})

// Inserst data to DB
app.post('/api/v1/prodcuts', async (req, res) => {
    try {
        const addProduct = {
            product_name:req.body.product_name,
            product_image:req.body.product_image,
            product_price:req.body.product_price
        }
        const insertedProducts = await Product.insertMany(addProduct);
        // Send response
        res.status(200).json({
            status: 'success',
            data: insertedProducts
        });
    } catch (error) {
        // Handle errors
        console.error('Error Posting products:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
});

//delet data from DB 

app.delete('/api/v1/prodcuts/:id', async (req,res)=>{
    try{
        const deleteProduct = await Product.findOneAndDelete(req.params.id)
        res.status(200).json({
            status: 'success',
            data: deleteProduct
        })
    }catch(error){
         // Handle errors
         console.error('Error Deleting products:', error);
         res.status(500).json({
             status: 'error',
             message: 'Internal server error'
         });
    }
})

// edit data from DB 
app.put('/api/v1/prodcuts/:id' ,async (req,res) =>{
    try{
        const editingproductdata = {
            product_name:req.body.product_name,
            product_image:req.body.product_image,
            product_price:req.body.product_price
        }
        const editProduct = await Product.findByIdAndUpdate(req.params.id,editingproductdata)
        res.status(200).json({
            status:'success',
            data:editProduct
        })
        console.log(editProduct)
    }catch(error){
        // Handle errors
        console.error('Error Editing products:', error);
        res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
})


module.exports = app;
