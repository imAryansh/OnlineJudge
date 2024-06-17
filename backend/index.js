const express=require('express');
const cors=require('cors');
const app=express();
// const mongoose=require('mongoose');
const {DBConnection}=require('./database/db.js');
const User=require('./models/Users.js');
const bcrypt=require('bcryptjs');//to hash password
const jwt=require('jsonwebtoken');//for authentication
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
dotenv.config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());

DBConnection();

app.get("/",(req,res)=>{
    res.send("Hello,world");
});

app.post("/register",async(req,res)=>{
    // console.log(req);
    try{
        //get all the data from request body
        const {firstname,lastname,email,password}=req.body;

        //check that all the data should exists
        if(!(firstname && lastname && email && password)){
            return res.status(400).send("Please enter all the information!")
        }

        //check if user already exists(From Database)
        const existingUser=await User.findOne({email});//NoSQL ODM ka kamal (no need to write query(findOne) and since findOne will take time so async and await is used)
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
        res.status(400).json({
            message:"You have successfully registered! ",user});
    }
    catch(error){
        console.log(error);
    }
});

app.post("/login", async (req, res) => {
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
        const enteredPassword = await bcrypt.compare(password, user.password);
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