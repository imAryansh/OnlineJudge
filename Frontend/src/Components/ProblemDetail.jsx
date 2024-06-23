import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ProblemSet from './ProblemSet';
import './ProblemDetail.css';

const ProblemDetail = () => {
    const { id } = useParams();
    const problem = ProblemSet.find(p => p.Pid === parseInt(id));

    if (!problem) {
        return <div>Problem not found</div>;
    }

    return (
        <div className="detail-container">
            <h1>{problem.Pname}</h1>
            <p><strong>Statement:</strong> {problem.Pstatement}</p>
            <p><strong>Difficulty:</strong> {problem.Pdifficulty}</p>
            <Link to="/">Back to Problems List</Link>
        </div>
    );
};

export default ProblemDetail;
