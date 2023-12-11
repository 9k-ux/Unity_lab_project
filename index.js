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


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


