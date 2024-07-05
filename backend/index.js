import express from "express";
import cors from "cors";
import { DBConnection } from "./database/db.js";
import Problem from "./models/Problems.js";
import User from "./models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const parentDir = dirname(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use(cookieParser());

DBConnection();

app.get("/", (req, res) => {
    res.send("Welcome to my Server! This side Aryansh😎");
});

app.post("/register", async (req, res) => {
    console.log("Received registration request:", req.body);
    try {
        const { firstname, lastname, email, password } = req.body;

        if (!(firstname && lastname && email && password)) {
            return res.status(400).send("Please enter all the information!");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("User already exists!");
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const user = await User.create({
            firstname,
            lastname,
            email,
            password: hashPassword,
        });

        const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, { expiresIn: "1d" });
        user.token = token;
        user.password = undefined;

        res.status(200).cookie("token", token, {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
            httpOnly: true,
        }).json({
            message: "You have successfully registered!",
            success: true,
            token,
        });
    } catch (error) {
        console.error("Registration failed:", error);
        res.status(500).send("Registration failed. Please try again.");
    }
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!(email && password)) {
            return res.status(400).send("Please enter all the information");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not found!");
        }

        const enteredPassword = await bcrypt.compare(password, user.password);
        if (!enteredPassword) {
            return res.status(401).send("Password is incorrect");
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "1d" });
        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.status(200).cookie("token", token, options).json({
            message: "You have successfully logged in!",
            success: true,
            token,
        });
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/api/problems", async (req, res) => {
    try {
        const { problemId, problemName, problemStatement, problemDifficulty, testCases } = req.body;

        if (!problemId || !problemName || !problemStatement || !problemDifficulty || !testCases) {
            return res.status(400).send("Please provide all the required fields including test cases");
        }

        const problem = new Problem({
            problemId,
            problemName,
            problemStatement,
            problemDifficulty,
            testCases,
        });

        await problem.save();

        res.status(201).json({ message: "Problem added successfully!" });
    } catch (error) {
        console.error("Error adding problem:", error);
        res.status(500).json({ message: "Error adding problem" });
    }
});

app.get("/api/problems", async (req, res) => {
    try {
        const problems = await Problem.find();
        res.json(problems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get("/api/problems/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await Problem.findById(id);
        if (!problem) {
            return res.status(404).json({ message: "Problem not found" });
        }
        res.json(problem);
    } catch (error) {
        console.error("Error fetching problem details:", error);
        res.status(500).json({ message: "Error fetching problem details" });
    }
});

// Temporary directory setup
const tempDir = path.join(__dirname, 'temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const compileCode = (language, code, input) => {
    return new Promise((resolve, reject) => {
      const fileId = uuidv4();
      let sourceFile, execFile, command;
      const inputFile = path.join(tempDir, `${fileId}.in`);
  
      switch (language) {
        case 'cpp':
          sourceFile = path.join(tempDir, `${fileId}.cpp`);
          execFile = path.join(tempDir, fileId);
          command = `g++ ${sourceFile} -o ${execFile} && ${execFile} < ${inputFile}`;
          break;
        case 'java':
          sourceFile = path.join(tempDir, `${fileId}.java`);
          execFile = `java ${path.join(tempDir, fileId)}`;
          command = `javac ${sourceFile} && ${execFile} < ${inputFile}`;
          break;
        case 'python':
          sourceFile = path.join(tempDir, `${fileId}.py`);
          command = `python ${sourceFile} < ${inputFile}`;
          break;
        default:
          return reject(new Error('Unsupported language'));
      }
  
      // Write the source code to a file asynchronously
      fs.writeFile(sourceFile, code, (err) => {
        if (err) {
          return reject(err);
        }

        // Write the input to a file asynchronously
        fs.writeFile(inputFile, input, (err) => {
          if (err) {
            return reject(err);
          }
  
          // Execute the command
          exec(command, (error, stdout, stderr) => {
            // Clean up the files
            if (fs.existsSync(sourceFile)) {
              fs.unlinkSync(sourceFile);
            }
            if (fs.existsSync(inputFile)) {
              fs.unlinkSync(inputFile);
            }
            if (language !== 'python' && fs.existsSync(execFile)) {
              fs.unlinkSync(execFile);
            }
  
            if (error) {
              return reject(new Error(stderr));
            }
            resolve(stdout);
          });
        });
      });
    });
  };
  

  app.post('/compile', async (req, res) => {
    const { language, code, input } = req.body;
    // console.log(req.body);
    try {
      const output = await compileCode(language, code, input);
      res.json({ output });
    } catch (error) {
      console.error('Error compiling code:', error);
      res.status(500).json({ message: 'Error compiling code' });
    }
  });
  

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
