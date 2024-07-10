import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import './styles.css';

const ProblemList = () => {
    const [problems, setProblems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProblems, setFilteredProblems] = useState([]);
    const [difficultyFilter, setDifficultyFilter] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/problems');
                setProblems(response.data);
                setFilteredProblems(response.data);
            } catch (error) {
                console.error('Error fetching problems:', error);
            }
        };

        fetchProblems();
    }, []);

    const handleProblemClick = (problemId) => {
        navigate(`/problems/${problemId}`);
    };

    const handleSearch = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        filterProblems(searchTerm, difficultyFilter);
    };

    const handleFilter = (event) => {
        const difficulty = event.target.value;
        setDifficultyFilter(difficulty);
        filterProblems(searchTerm, difficulty);
    };

    const filterProblems = (searchTerm, difficulty) => {
        let filtered = [...problems];

        if (searchTerm.trim() !== '') {
            filtered = filtered.filter(problem =>
                problem.problemName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (difficulty !== '') {
            filtered = filtered.filter(problem =>
                problem.problemDifficulty === difficulty
            );
        }

        setFilteredProblems(filtered);
    };

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

    return (
        <div className="problem-list-container">
            <div className="filters">
                <input
                    type="text"
                    placeholder="Search by problem name"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <select value={difficultyFilter} onChange={handleFilter} className="filter-select">
                    <option value="">Filter by difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <table className="problems-table">
                <thead>
                    <tr>
                        <th>Problem ID</th>
                        <th>Problem Name</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProblems.map((problem, index) => (
                        <tr key={index} onClick={() => handleProblemClick(problem._id)} className="problem-row">
                            <td>{problem.problemId}</td>
                            <td>{problem.problemName}</td>
                            <td style={{ color: getDifficultyColor(problem.problemDifficulty) }}>{problem.problemDifficulty}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Footer />
        </div>
    );
};

export default ProblemList;


