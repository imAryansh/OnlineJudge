import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    Pid: {
        type: Number,
        unique: true,
        required: true
    },
    Pname: {
        type: String,
        required: true
    },
    Pstatement: {
        type: String,
        required: true
    },
    Pdifficulty: {
        type: String,
        required: true
    }
});

// module.exports = mongoose.model('Problem', problemSchema);
export default mongoose.model('Problem', problemSchema);