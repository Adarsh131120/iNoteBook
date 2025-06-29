 


import React, { useContext } from 'react';
import noteContext from '../context/notes/NotesContext';
import './Noteitem.css'; // Assuming you have a CSS file for styling

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updatenote } = props;

  return (
    <div className="note-item col-md-3">
      <div className="card my-3 note-card">
        <div className="card-body">
          <div className="note-header d-flex align-items-center justify-content-between">
            <h5 className="card-title note-title">{note.title}</h5>
            <div className="note-actions">
              <i
                className="fa-solid fa-trash mx-2 note-action-icon"
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted successfully", "success");
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square mx-2 note-action-icon"
                onClick={() => {
                  updatenote(note);
                }}
              ></i>
            </div>
          </div>
          <p className="card-text note-description">{note.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Noteitem;
