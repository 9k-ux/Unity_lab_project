const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.json());
console.log("hello world");




// Auth API - Register
app.post('/api/auth/register', (req, res) => {
  const { username, password, userType } = req.body;
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


