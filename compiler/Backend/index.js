const express =require( "express");
const app=express();
const {generateFile} =require ("./generateFile.js");
const {executeCpp}=require("./executeCpp.js");
const cors=require('cors');

//middlewares
app.use('cors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({online:"compiler"});
});

app.post("/run",async (req,res)=>{
    const {language="cpp",code}=req.body;
    if(code===undefined){
        return res.status(400).json({success:false,message:"Empty code!"})
    }
    //Now if user had send lang and code,then make a separate file and paste that code in that file
    try{
        const filePath=await generateFile(language,code);
        const output=await executeCpp(filePath);//You'll need to make executeJava,executePython.
        res.send({filePath,output});
    }catch(error){
        res.status(500).json({success:false,message:"Error: "+error.message});
    }
});

app.listen(8000,()=>{
    console.log("Server is running on port 8000!");
});