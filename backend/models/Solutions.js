import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
    Pid: {
        type: mongoose.Schema.Types.Number,
        ref: 'Problem',
        required: true
    },
    verdict: {
        type: String,
        required: true
    },
    submitted_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Solution', solutionSchema);
