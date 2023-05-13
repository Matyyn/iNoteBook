const express = require("express");
//using the hashing passwords function
const bcrypt = require('bcryptjs');
//use the user here
const Users = require("../models/Users");
const router = express.Router();
//express validator
const { body, validationResult } = require("express-validator");
//requiring a json web token
var jwt =require('jsonwebtoken'); 
const User = require("../models/Users");
//making a jwt secret 
JWT_SECRET  = "MATEENISMYNAME" 
const fetchuser =require("../middleware/fetchuser");


// Route 1: Create a User using :POST using endpoint "/api/auth/createuser".Doesn't require Auth
//No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //saving it in the database

    // it will also catch the duplicate value
    //check whether  the user with same email exists
    try {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({
            error: "Sorry a user already exist with the same email name",
          });
      }
      // salt will be generated
      const salt = await bcrypt.genSalt(10);
      // we don"t need to save the salt but use it here
      //and we are using await because bcrpyt hash function use to return a promise
      const secPassword =  await bcrypt.hash(req.body.password,salt);
      // create a new user
      user = await Users.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
      //.then(user => res.json(user)).catch(err=>{console.log(err)
      //   res.json({error:'Please enter a unique value for email',message:err.message})});
      // // it is response of the body
      // res.send(req.body);

      const data = {
        user:{
          id:user.id,
        }
      }

      //making a sign of the jwt for recognizing it
      const authToken = jwt.sign(data,JWT_SECRET);
      

      //sending the response in json format the user details
      res.json({authToken});
    } catch (error) {
      console.log(error.messsage);
      res.status(500).send("Some internal error occurred");      
    }
  }
);
//Route 2: Authenticate a User using:POST using endpoint "/api/auth/login".Doesn't require Auth
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(), 
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions

    //if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //now destructing it to take out the email and password from the body
    const {email,password} = req.body;
    try {
      let user = await User.findOne({email});
      //if no user exists then
      if(!user)
      {
        return res.status(400).json({error:"Please try to login with correct crendentials"});        
      }
      //now comparing the passwords of the database and entered one
      const passwordCompare = await bcrypt.compare(password,user.password);
      if(!passwordCompare){
        return res.status(400).json({error:"Please try to login with correct crendentials"});        
      }
      const data = {
        user:{
          id:user.id,
        }
      }

      //making a sign of the jwt for recognizing it
      const authToken = jwt.sign(data,JWT_SECRET);
      

      //sending the response in json format the user details
      res.json({authToken});

    } catch (error) {
      console.log(error.messsage);
      res.status(500).send("Some internal error occurred");      
    }
  }  
    )


//Route 3: Get logged in users details using:POST using endpoint "/api/auth/getuserdetails".Auth required
router.post(
  "/getuserdetails",fetchuser,
  async (req, res) => {
try {
  userId=req.user.id;
  const user = await User.findById(userId).select("*");
  res.send(user);
} catch (error) {
  
}})
module.exports = router;
