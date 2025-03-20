import React, { useContext } from 'react'
import noteContext from '../context1/notes/noteContext'

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className='col-md-3'>
      <div className="card">
        <div className="card-body">
          <div className='d-flex align-items-center'>
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-solid fa-trash ms-3" onClick={() => { deleteNote(note._id); props.showAlert('Deleted Successfully!', 'success'); }}></i>
            <i className="fa-solid fa-edit mx-3" onClick={() => { updateNote(note) }}></i>
          </div>
          <p className="card-text">{note.description}</p>

        </div>
      </div>
    </div>
  )
}

export default Noteitem
