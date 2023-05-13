import NoteContext from "./noteContext";
import { useState } from "react";
//make an arrow function
const NoteState = (props) => {
  const host = "http://localhost:5000";
  // all the notes are here of the current user
  const notesInitial = [
  ];
  const [Notes, setNotes] = useState(notesInitial);
  // //making an auto state change function
  // const [state, setstate] = useState(s1);
  // //update function using arrow function
  // const update = ()=>{
  //     setTimeout(()=>{
  //         setstate({
  //             "name":"Mateen",
  //             "class":"6 sem",
  //         })
  //     },1000)
  // }

  //Add a Note
  const addNote = async (title, description, tag) => {
    
        //API calls
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNGU2YTZmNTU2YmVlZjFkMzQwMjA5In0sImlhdCI6MTY2MDIxNjk5OH0.q4h0u9DFigxEcFWSjauyY2G1jPtVsnCVvJ8Kk__lSVw",
          },
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
    
        const json = response.json();
        console.log(json)
    //logic to add a note

    const note = json;

    //this below function will push the note to the Notes array
    setNotes(Notes.concat(note));
  };


  
  
  //Get all Notes
  const getNotes = async () => {
    
        //API calls
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            "auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNGU2YTZmNTU2YmVlZjFkMzQwMjA5In0sImlhdCI6MTY2MDIxNjk5OH0.q4h0u9DFigxEcFWSjauyY2G1jPtVsnCVvJ8Kk__lSVw",
          },
         
        });
      const json  = await response.json();
      console.log(json);
      //set all the notes
      setNotes(json);
  };




  //Delete a Note
  const deleteNote = async (id) => {
    //API call for deleting it in the database too    
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNGU2YTZmNTU2YmVlZjFkMzQwMjA5In0sImlhdCI6MTY2MDIxNjk5OH0.q4h0u9DFigxEcFWSjauyY2G1jPtVsnCVvJ8Kk__lSVw",
      },
    });
    const json = response.json(); // parses JSON response into native JavaScript objects
    console.log(json);

    console.log("Deleting the note with id: " + id);
    //removing the notes using filter function
    const newNotes = Notes.filter((note) => {
      //returning the notes which doesn't match this condition
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    //API calls
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJmNGU2YTZmNTU2YmVlZjFkMzQwMjA5In0sImlhdCI6MTY2MDIxNjk5OH0.q4h0u9DFigxEcFWSjauyY2G1jPtVsnCVvJ8Kk__lSVw",
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = response.json(); // parses JSON response into native JavaScript objects

    //logic to edit in client sight
    for (let index = 0; index < Notes.length; index++) {
      const element = Notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    // we can use the noteContext in this way and by using the provider and children all childrens of it will come inside it
    <NoteContext.Provider value={{ Notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
