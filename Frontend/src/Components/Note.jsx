import React from "react";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  const getDiffColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "green";
      case "Medium":
        return "yellow";
      case "Hard":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <h2
        style={{
          fontWeight: 'bold',
          fontStyle: 'italic',
          fontSize: '20px',
          color: getDiffColor(props.diff),
        }}
      >
        {props.diff}
      </h2>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
