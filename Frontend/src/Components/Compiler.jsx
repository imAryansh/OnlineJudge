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

const Compiler = ({ problem }) => {
    const [code, setCode] = useState(defaultCodeSnippets.cpp);
    const [language, setLanguage] = useState('cpp');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [result, setResult] = useState(''); // State to store the result

    useEffect(() => {
        setCode(defaultCodeSnippets[language]);
    }, [language]);



    const handleSubmit = async (e, isSubmit) => {
        e.preventDefault();
    
        try {
            const compileResponse = await axios.post('http://localhost:8000/compile', {
                language,
                code,
                input: isSubmit ? problem.testCases[0].input : input
            });
    
            const codeOutput = compileResponse.data.output.trim();
            setOutput(codeOutput);
            setError('');
    
            if (isSubmit) {
                const submitResponse = await axios.post('http://localhost:8000/submit', {
                    language,
                    code,
                    problemId: problem._id
                });
    
                if (!submitResponse || !submitResponse.data || !submitResponse.data.results) {
                    throw new Error('Invalid submission response');
                }
    
                const results = submitResponse.data.results;
                const allPassed = results.every(result => result.passed);
                setResult(allPassed ? 'Accepted' : 'Rejected');

             // Construct the output text based on results
                const outputText = results.map(result => {
                    const { input, expectedOutput, output, passed } = result;
                    return `Input: ${input}\nExpected: ${expectedOutput}\nGot: ${output}\n${passed ? 'Passed' : 'Failed'}\n\n`;
                }).join('');
    
                setOutput(outputText);

            }
        } catch (err) {
            console.error("Error in handleSubmit:", err);
            setError(err.response?.data?.message || 'Error compiling code');
            setOutput('');
            setResult('');
        }
    };    
    
    

    return (
        <div className="compiler-container">
            <form onSubmit={(e) => handleSubmit(e, false)}>
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
                <br/>
                <button type="button" onClick={(e) => handleSubmit(e, true)}>Submit</button>
            </form>
            <div>
                <h3>Output:</h3>
                {output ? <p>{output}</p> : <p>No output yet.</p>}
                {error && (
                    <div className="error">
                        <p>{error}</p>
                    </div>
                )}
                {result && (
                    <div className={`result ${result.toLowerCase()}`}>
                        <p>{result}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Compiler;


/*int a,b;
 cin>>a>>b;
 cout<<a+b;*/