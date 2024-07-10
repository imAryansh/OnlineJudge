import React, { useState } from "react";

function CreateArea(props) {
  const [note, setNote] = useState({
    problemId: "",
    problemName: "",
    problemStatement: "",
    problemDifficulty: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  function submitNote(event) {
    event.preventDefault();
    props.onAdd(note);
    setNote({
      problemId: "",
      problemName: "",
      problemStatement: "",
      problemDifficulty: ""
    });
  }

  return (
    <div>
      <form>
        <input name="problemId" onChange={handleChange} value={note.problemId} placeholder="Problem ID (Optional)" />
        <input name="problemName" onChange={handleChange} value={note.problemName} placeholder="Problem Name" />
        <textarea name="problemStatement" onChange={handleChange} value={note.problemStatement} placeholder="Problem Statement" />
        <input name="problemDifficulty" onChange={handleChange} value={note.problemDifficulty} placeholder="Difficulty" />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;


