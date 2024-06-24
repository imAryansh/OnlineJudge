import express from "express";
import cors from "cors";
const app=express();
import {DBConnection} from "./database/db.js";
import User from "./models/Users.js";
import bcrypt from "bcryptjs";//to hash password
import jwt from "jsonwebtoken";//for authentication
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const parentDir = dirname(__dirname);

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin: 'http://localhost:5173',  // Adjust this to match your frontend URL
    credentials: true,
  }));
app.use(cookieParser());

DBConnection();

app.get("/",(req,res)=>{
    res.send("Welcome to my Server!This side Aryansh😎");
});

app.post("/register",async(req,res)=>{
    console.log("Received registration request:", req.body);
    try{
        //get all the data from request body
        const {firstname,lastname,email,password}=req.body;

        //check that all the data should exists
        if(!(firstname && lastname && email && password)){
            return res.status(400).send("Please enter all the information!")
        }

        //check if user already exists(From Database)
        const existingUser=await User.findOne({email});//NoSQL ODM(object Data Model) ka kamal (no need to write query(findOne) and since findOne will take time so async and await(promises)is used)
        if(existingUser){
            return res.status(400).send("User already exists!");
        }

        //encrypt the password
        const hashPassword=bcrypt.hashSync(password,10);
        // console.log(hashPassword);

        //save the user in database
        const user=await User.create({
            firstname,
            lastname,
            email,
            password:hashPassword,
        });

        //generate a token for user and send it 
        const token=jwt.sign({id:user._id,email},process.env.SECRET_KEY
            ,{expiresIn:"1d"});
        user.token= token;//appended token to database
        user.password=undefined;//No need of password on frontend
        
        // res.status(400).json({
        //     message:"You have successfully registered! ",user});
        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true,
          }).json({
            message: "You have successfully registered!",
            success: true,
            token,
          });
    }
    catch(error){
        // console.log(error);
        console.error("Registration failed:", error);
    res.status(500).send("Registration failed. Please try again.");
    }
});

app.post("/login", async (req, res) => {
    // console.log(req.body);
    try {
        //get all the user data
        const { email, password } = req.body;

        // check that all the data should exists
        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        //find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        //match the password
        const enteredPassword = await bcrypt.compare(password, user.password);//compare the hashed password
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });
        user.token = token;
        user.password = undefined;

        //store cookies
        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true, //only manipulate by server not by client/user
        };

        //send the token
        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
    }
});

app.listen(8000,()=>{
    console.log("Server is listening on port 8000");
});