
import { useContext, useState } from 'react';
import noteContext from '../context/notes/NotesContext';
import './AddNote.css';

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: '', description: '', tag: 'default' });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    props.showAlert("Note added successfully", "success");
    setNote({ title: '', description: '', tag: '' });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="addnote-container">
      <h2 className="addnote-title">Add a New Note</h2>
      <form className="addnote-form" onSubmit={handleClick}>
        <div className="input-group">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-input"
            id="title"
            name="title"
            value={note.title}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            className="form-input"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input
            type="text"
            className="form-input"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button
          disabled={note.title.length < 5 || note.description.length < 5}
          type="submit"
          className="addnote-button"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
