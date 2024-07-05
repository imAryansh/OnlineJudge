import React, { useState } from 'react';
import axios from 'axios';

const AddProblems = () => {
    const [problem, setProblem] = useState({
        problemId: '',
        problemName: '',
        problemStatement: '',
        problemDifficulty: '',
        testCases: [{ input: '', output: '' }]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblem({
            ...problem,
            [name]: value
        });
    };

    const handleTestCaseChange = (index, e) => {
        const { name, value } = e.target;
        const newTestCases = [...problem.testCases];
        newTestCases[index][name] = value;
        setProblem({
            ...problem,
            testCases: newTestCases
        });
    };

    const addTestCase = () => {
        setProblem({
            ...problem,
            testCases: [...problem.testCases, { input: '', output: '' }]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/problems', problem);
            alert('Problem and Test Cases added successfully!');
            setProblem({
                problemId: '',
                problemName: '',
                problemStatement: '',
                problemDifficulty: '',
                testCases: [{ input: '', output: '' }]
            });
        } catch (error) {
            console.error('Error adding problem and test cases:', error);
        }
    };

    return (
        <div>
            <h2>Add a New Problem</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Problem ID:</label>
                    <input
                        type="text"
                        name="problemId"
                        value={problem.problemId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Problem Name:</label>
                    <input
                        type="text"
                        name="problemName"
                        value={problem.problemName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Problem Statement:</label>
                    <textarea
                        name="problemStatement"
                        value={problem.problemStatement}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Problem Difficulty:</label>
                    <select
                        name="problemDifficulty"
                        value={problem.problemDifficulty}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>
                </div>
                <div>
                    <h3>Test Cases</h3>
                    {problem.testCases.map((testCase, index) => (
                        <div key={index}>
                            <div>
                                <label>Input:</label>
                                <textarea
                                    name="input"
                                    value={testCase.input}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    required
                                />
                            </div>
                            <div>
                                <label>Output:</label>
                                <textarea
                                    name="output"
                                    value={testCase.output}
                                    onChange={(e) => handleTestCaseChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <button type="button" onClick={addTestCase}>Add Test Case</button>
                </div>
                <button type="submit">Add Problem</button>
            </form>
        </div>
    );
};

export default AddProblems;
