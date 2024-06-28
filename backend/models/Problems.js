import mongoose from 'mongoose';

// Define the schema for test cases
const TestCaseSchema = new mongoose.Schema({
    input: {
        type: String,
        required: true,
    },
    output: {
        type: String,
        required: true,
    },
});

// Define the schema for problems
const ProblemSchema = new mongoose.Schema({
    problemId: {
        type: String,
        required: true,
        unique: true,
    },
    problemName: {
        type: String,
        required: true,
    },
    problemStatement: {
        type: String,
        required: true,
    },
    problemDifficulty: {
        type: String,
        required: true,
    },
    testCases: {
        type: [TestCaseSchema], // Use the TestCaseSchema here
        required: true,
    },
});

const Problem = mongoose.model('Problem', ProblemSchema);

export default Problem;
