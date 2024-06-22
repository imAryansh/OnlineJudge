// Problem.js
import React from 'react';
import ProblemSet from './ProblemSet';
import './Problems.css';

const Problem = () => {
    return (
        <div>
            <h1 className="heading">Coding Problems</h1>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Statement</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {ProblemSet.map(problem => (
                        <tr key={problem.Pid}>
                            <td>{problem.Pid}</td>
                            <td>{problem.Pname}</td>
                            <td>{problem.Pstatement}</td>
                            <td>{problem.Pdifficulty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Problem;
