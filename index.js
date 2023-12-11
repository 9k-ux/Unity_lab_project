const express = require('express');
const bodyParser = require('body-parser');
require("./db/config");
const User = require('./db/user')
const session = require('express-session');

const app = express();
const port = 3000;


app.use(
    session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: true,
    })
  );

// Middleware to check if the user is authenticated
const authenticateUser = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next(); 
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  };


// Auth API - Register
app.post('/api/auth/register',bodyParser.json(), async(req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    console.log(result);
    res.send(result);
   

});

// Authentication 
app.post('/api/auth/login',bodyParser.json(),async (req, res) => {
    const { username, password } = req.body;
  
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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


