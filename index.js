const express = require('express');
const bodyParser = require('body-parser');
require("./db/config");
const User = require('./db/user')
const Product = require('./db/product')
const Order = require('./db/order')
const session = require('express-session');

const app = express();
const port = 3000;


app.use(
    session({
      secret: 'my-secret-key',
      resave: false,
      saveUninitialized: true,
    })

  );
  app.use(bodyParser.json());


// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.userId) {
        req.sellerId = req.session.userId; 
        req.buyerID=req.session.userId; 
        
      return next(); 
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };

 
// Auth API - Register
app.post('/auth/register', async(req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    console.log(result);
    res.send(result);
   

});


// Authentication 
app.post('/auth/login',async (req, res) => {
    const { username, password } = req.body;
    console.log("hi sir");
  
    try {
      // 
      const user = await User.findOne({ username, password });
      if (user) {
        req.session.userId = user._id;
        res.json({ message: 'User logged in successfully.', user });
      } else {
        res.status(401).json({ error: 'Invalid credentials.' });
      }

      
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Seller APIS

  // creating catalog for products

  app.post('/seller/create-catalog',authenticateUser,async(req,res)=>{
    const sellerId2 = req.sellerId;

    const productData = {
      ...req.body,
      seller_id: sellerId2,
    };

    try{
      
      let product = new Product(productData);
      let result = await product.save();
      result = result.toObject();
      console.log(result);
    }
    catch (error){
      console.error(error);

    }
   

  });

 // to get order details for seller

  app.get("/seller/orders",authenticateUser,async(req,res)=>{
    const sellerId2 = req.sellerId;
    let sellers = await Order.find({ seller_id: sellerId2}).select('Buyer_Id Product_name');
  res.send(sellers);

  })

// API FOR BUYERS

// To get all the sellers name and seller id 
app.get('/buyer/list-of-sellers',async(req,res)=>{

  let sellers = await User.find({ usertype: 'seller' }).select('username _id');
  res.send(sellers);

})
// To get catalogue of seller by seller id 

app.get('/buyer/seller-catalog/:seller_id',async(req,res)=>{
  const sellerId21 = req.params.seller_id;

  let items = await Product.find({ seller_id:sellerId21}).select('name price -_id');
  res.send(items);

})

// To order a product from specific seller 

app.post('/buyer/create-order/:seller_id',authenticateUser,async(req,res)=>{
  const sellerId23 = req.params.seller_id;
  const Buyer_id = req.buyerID;
  

  const productData = {
    ...req.body,
    Buyer_Id:Buyer_id,
    seller_id:sellerId23
  };

  try{
    
    let order = new Order(productData);
    let result = await order.save();
    result = result.toObject();
    
    res.send(`succesufull created your order wiht order id ${result._id}`)
  }
  catch (error){
    console.error(error);

  }
 
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


