const fs=require("fs");
const path=require("path");
const { v4: uuid } = require('uuid');

const dirCodes=path.join(__dirname,"codes"); /*E:\OJ\backend\codes*/

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes,{recursive:true});
}

const generateFile=async (language,code)=>{
    const jobID=uuid();//random generated string(let's call rand)
    const filename=`${jobID}.${language}`;//rand.cpp
    const filePath=path.join(dirCodes,filename);//E:\OJ\backend\codes\rand.cpp
    fs.writeFileSync(filePath,code);
    return filePath;
};

module.exports={generateFile};