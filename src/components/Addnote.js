import React, { useContext, useState } from 'react'
import noteContext from '../context1/notes/noteContext'

const Addnote = (props) => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const onHandleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" })
    props.showAlert('Added Successfully!', 'success');
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className="container my-4">
      <h2>Add a note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={onChange} aria-describedby="titleHelp" value={note.title} minLength={5} required />
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">tag</label>
            <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} minLength={5} required />
          </div>

          <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={onHandleSubmit} >Add note</button>
        </div>
      </form>
    </div>
  )
}


export default Addnote
