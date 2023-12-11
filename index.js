const express = require('express');
const bodyParser = require('body-parser');
require("./db/config");
const User = require('./db/user')

const app = express();
const port = 3000;

app.use(bodyParser.json());


// Auth API - Register
app.post('/api/auth/register', async(req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    console.log(result);
    res.send(result);
   

});

// Authentication 
app.post('/api/auth/login',async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // 
      const user = await User.findOne({ username, password });
      console.log(user);
  
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


