// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ProblemSet from './ProblemSet';
// import './Problems.css';

// const Problems = () => {
//     const navigate = useNavigate();

//     const handleRowClick = (id) => {
//         navigate(`/problem/${id}`);
//     };

//     return (
//         <div>
//             <h1 className="heading">Coding Problems</h1>
//             <table className="table-container">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Statement</th>
//                         <th>Difficulty</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {ProblemSet.map(problem => (
//                         <tr key={problem.Pid} onClick={() => handleRowClick(problem.Pid)}>
//                             <td>{problem.Pid}</td>
//                             <td>{problem.Pname}</td>
//                             <td>{problem.Pstatement}</td>
//                             <td>{problem.Pdifficulty}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Problems;

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import './Problems.css';

function Problems() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header content="Problems"/>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            diff={noteItem.diff}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default Problems;
