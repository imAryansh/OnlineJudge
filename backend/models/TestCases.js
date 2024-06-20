import mongoose from "mongoose";

const testCaseSchema = new mongoose.Schema({
    Pid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    }
});

// module.exports = mongoose.model('Testcase',testCaseSchema);
export default mongoose.model('Testcase',testCaseSchema);
