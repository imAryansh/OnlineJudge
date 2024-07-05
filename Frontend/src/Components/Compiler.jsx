import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const defaultCodeSnippets = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    python: `def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()`
};

const Compiler = () => {
    const [code, setCode] = useState(defaultCodeSnippets.cpp);
    const [language, setLanguage] = useState('cpp');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        setCode(defaultCodeSnippets[language]);
    }, [language]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/compile', {
                language,
                code,
                input
            });
            // console.log('Response:', response);
            // console.log('Output:', response.data.output);
            setOutput(response.data.output);
            setError('');
        } catch (err) {
            // console.error('Error:', err);
            setError(err.response.data.message || 'Error compiling code');
            setOutput('');
        }
    };

    return (
        <div className="compiler-container">
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="language">Language:</label>
                    <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="code">Code:</label>
                    <textarea
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        rows="10"
                        cols="50"
                    />
                </div>
                <div>
                    <label htmlFor="input">Input (optional):</label>
                    <textarea
                        id="input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows="5"
                        cols="50"
                    />
                </div>
                <button type="submit">Run</button>
            </form>
            <div>
                <h3>Output:</h3>
                {output ? <p>{output}</p> : <p>No output yet.</p>}
                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compiler;
