import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Compiler from './Compiler';  // Ensure you have imported the Compiler component
import './styles.css';

const ProblemDetails = () => {
    const { problemId } = useParams(); // This is actually the MongoDB ObjectId (_id)
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const fetchProblemDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/problems/${problemId}`);
                setProblem(response.data);
            } catch (error) {
                console.error('Error fetching problem details:', error);
            }
        };

        fetchProblemDetails();
    }, [problemId]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty.toLowerCase()) {
            case 'easy':
                return 'green';
            case 'medium':
                return 'yellow';
            case 'hard':
                return 'red';
            default:
                return 'black'; // Default color if difficulty is unknown
        }
    };

    if (!problem) {
        return <div>Loading...</div>;
    }

    return (
        <div className="problem-details-container">
            <div className="problem-details-left">
                <h2><strong>{problem.problemId}. {problem.problemName}</strong></h2>
                <p><strong>Difficulty:</strong> <span style={{ color: getDifficultyColor(problem.problemDifficulty) }}>{problem.problemDifficulty}</span></p>
                <div className="problem-statement">
                    <h3>Problem Statement</h3>
                    <p>{problem.problemStatement}</p>
                </div>
                <div className="test-cases">
                    <h3>Test Cases</h3>
                    {problem.testCases.map((testCase, index) => (
                        <div key={index} className="test-case">
                            <p><strong>Input:</strong> {testCase.input}</p>
                            <p><strong>Output:</strong> {testCase.output}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="compiler-section">
                <Compiler />
            </div>
        </div>
    );
};

export default ProblemDetails;
