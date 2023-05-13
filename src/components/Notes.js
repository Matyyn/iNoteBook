import React, { useContext, useEffect, useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
function Notes() {
  //notes will be imported here using the context api
  const context = useContext(noteContext);
  const { Notes, getNotes } = context;
  //call the get notes from the NoteItem.js to fetch all the notes

  const ref = useRef(null);
  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag});
  };

  const handleClick=(e)=>{
    console.log('updating the note',note)
  }

  useEffect(() => {
    return () => {
      getNotes();
    };
  }, []);
  const [note, setNote] = useState({etitle:"",edescription:"",etag:"default"})
  const onChange=(e)=>{
    // this will get the value from the targeted input and store it in the component  // for better checking of it use the components section in the browser
    setNote({...note,[e.target.name]:e.target.value})
  }




  return (
    <>
      <AddNote />
      {/* modal for updating notes  and ref here is used for reference*/}

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    onChange={onChange}
                    name="etitle"
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                    minLength={5}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etag.length<3||note.etitle.length<5 || note.edescription.length<5 } type="button" onClick={handleClick()} className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h3 style={{ textDecoration: "underline" }}>Your Notes</h3>
        {Notes.length===0 && 'No Notes to display Now'}
        {
          //all notes titles will be displayed here using map function
          Notes.map((note) => {
            //passing a note prop to the Noteitem
            return (
              <NoteItem key={note._id} updateNote={updateNote} note={note} />
            );
          })
        }
      </div>
    </>
  );
}

export default Notes;
