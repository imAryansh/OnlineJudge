const fs=require("fs");
const path=require("path");
const {exec}=require("child_process");
// const { stdout, stdin } = require("process");

const outputPath=path.join(__dirname,"outputs"); /*E:\OJ\backend\outputs*/

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath,{recursive:true});
}

const executeCpp=(filepath)=>{
    // E:\OJ\compiler\Backend\outputs\bca19458-466a-4e3c-8925-4b4a25b64003.cpp
    const jobId=path.basename(filepath).split(".")[0];//basename gives last part of filepath -> bca19458-466a-4e3c-8925-4b4a25b64003.cpp and split(".") splits into array of elements separated by "." and [0] index gives bca19458-466a-4e3c-8925-4b4a25b64003
    const filename=`${jobId}.exe`;//bca19458-466a-4e3c-8925-4b4a25b64003.exe
    const outPath=path.join(outputPath,filename);//E:\OJ\backend\outputs\bca19458-466a-4e3c-8925-4b4a25b64003.exe

    //child process
    return new Promise((resolve,reject) => {
        exec(
            `g++ ${filepath} -o ${outPath} && cd ${outputPath} && .\\${filename}`,
            (error,stdout,stderr)=>{
            if(error){
                reject({error,stderr});
            }
            if(stderr){
                reject(stderr);
            }
                resolve(stdout);
        })
    })
};

module.exports={executeCpp};