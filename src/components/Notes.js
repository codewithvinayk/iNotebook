import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context1/notes/noteContext'
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      getNotes();
    } else {
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" })

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
  }

  const onHandleSubmit = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag); //Call editnote from context
    refClose.current.click();
    props.showAlert('Updated Successfully!', 'success');
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <Button ref={ref} className='d-none' variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} aria-describedby="titleHelp" minLength={5} required />
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={refClose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={note.etitle?.length < 5 || note.edescription?.length < 5} variant="primary" onClick={onHandleSubmit}>
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <button type="button" ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body"> */}
      {/* <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" onChange={onChange} aria-describedby="titleHelp" />
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" onChange={onChange} />
                  </div>

                  <button type="submit" className="btn btn-primary" onClick={onHandleSubmit} >Add note</button>
                </div>
              </form> */}
      {/* ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="row my-4 mx-1">
        <h2>Your notes</h2>
        <div className="container mx-1">
          {notes.length === 0 && "No note to display"}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes 
