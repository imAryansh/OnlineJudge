import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

// module.exports=mongoose.model('User',userSchema);//Make sure to write user in singular as it automatically write users on panel!
export default mongoose.model('User', userSchema);