# REST API for an e-commerce marketplace.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/9k-ux/Unity_lab_project.git

## Install dependencies
   
  npm install

## Usage

To start the application, run `npm index.js` in the terminal.


## To test the Post and Get Api use Postmen
Postman can be downloaded and installed from the official Postman website. Here are the steps to download and install Postman:

Visit the Postman Website:
Go to the official Postman website: https://www.postman.com/


## Authentication 

 Login Api :-http://localhost:3000/auth/login

 demo password
 Req.body{
    "username":"kapil",
    "password":"1234" 


 }
 
 response {
    
    "message": "User logged in successfully.",
    "user": {
        "_id": "65773bb9b92f57eab8e62799",
        "username": "kapil",
        "password": "1234",
        "usertype": "seller",
        "__v": 0
    }
 }





## Buyers Apis

These two api's we are not protected so you don't need to signed in to use these api's

Fetch all the sellers with their name seller id http://localhost:3000/buyer/list-of-sellers.

Fetch the catalogue of seller corresponding to it's seller id http://localhost:3000/buyer/seller-catalog/65773bb9b92f57eab8e62799

#ordering a product

To place an order you need to first authenticate yourself .

http://localhost:3000/buyer/create-order/65773bb9b92f57eab8e62799
65773bb9b92f57eab8e62799-> this is a seller id you can use any other seller id also.

req.body 
{
"Product_name":"Iphone50"
}
response generated after succefull order
succesufull created your order wiht order id 6578c6d040250106d50f460a


##  Seller Api

To create catalogue of product 
Api : http://localhost:3000/seller/create-catalog

req.body
    {
       "name": "Iphone21",
    "price": "150000"


  
}


To get details of order received 
you need to authenticate yourself to fetch your order's details
http://localhost:3000/seller/orders

