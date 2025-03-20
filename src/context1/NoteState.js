import React, { useState } from 'react'
// import React, { useState } from 'react'
import NoteContext from './notes/noteContext'

const NoteState = (props) => {

  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)

  //Get all notes
  const getNotes = async () => {
    //API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('auth-token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiZDU3MTczMWE3NjQ2NzE3MTgzMjM5In0sImlhdCI6MTc0MDUzNDY3NX0.s_7yBPXMHDjnAE9AjNyTq1YggrFPqprlXddFiwaG_f0"
      },
    });

    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  //Add a note
  const addNote = async (title, description, tag) => {
    // console.log("Adding a note")
    //Api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiZDU3MTczMWE3NjQ2NzE3MTgzMjM5In0sImlhdCI6MTc0MDUzNDY3NX0.s_7yBPXMHDjnAE9AjNyTq1YggrFPqprlXddFiwaG_f0"
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote = async (id) => {
    //Api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiZDU3MTczMWE3NjQ2NzE3MTgzMjM5In0sImlhdCI6MTc0MDUzNDY3NX0.s_7yBPXMHDjnAE9AjNyTq1YggrFPqprlXddFiwaG_f0"
        "auth-token": localStorage.getItem('auth-token')
      },
    });
    const json = response.json();
    console.log(json)

    console.log("Deleting the note of the id" + id)
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiZDU3MTczMWE3NjQ2NzE3MTgzMjM5In0sImlhdCI6MTc0MDUzNDY3NX0.s_7yBPXMHDjnAE9AjNyTq1YggrFPqprlXddFiwaG_f0"
        "auth-token": localStorage.getItem('auth-token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)
    console.log("Edited and Updated the existing note")

    let newNotes = JSON.parse(JSON.stringify(notes));
    //Logic to edit a note
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        newNotes[index].title = title;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;