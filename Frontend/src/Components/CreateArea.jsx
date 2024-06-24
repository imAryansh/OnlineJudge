import React, { useState } from "react";

function CreateArea(props) {
const [note, setNote] = useState({
    title: "",
    content: "",
    diff:""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    props.onAdd(note);
    setNote({
      title: "",
      content: "",
      diff:"",
    });
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Problem Name"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Problem Statement"
          rows="3"
        />
        <input
          name="diff"
          onChange={handleChange}
          value={note.diff}
          placeholder="Difficulty"
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
