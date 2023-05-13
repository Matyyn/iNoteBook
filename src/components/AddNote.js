import React ,{useContext,useState}from 'react'
import noteContext from "../context/notes/noteContext";
function AddNote() {
  //notes will be imported here using the context api
  const context = useContext(noteContext)
  const {addNote} =  context; 

  //make a state here
  const [note, setNote] = useState({title:"",description:"",tag:""})
  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);  
    //this will reset the values of the input fieldss
    //setNote({title:"",description:"",tag:""})
  }
  const onChange=(e)=>{
    // this will get the value from the targeted input and store it in the component  // for better checking of it use the components section in the browser
    setNote({...note,[e.target.name]:e.target.value})
  }

  return (
    <div className="container my-3">
    <h3 style={{ textDecoration: "underline" }}>Add a Note</h3>

    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          onChange={onChange}
          name="title"
          minLength={5}
          required
          value={note.title}
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          onChange={onChange}
          minLength={5}
          required
          value={note.description}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          onChange={onChange}
          minLength={5}
          required
          value={note.tag}        
        />
      </div>
      <button disabled={note.tag.length<3||note.title.length<5 || note.description.length<5 } type="submit" onClick={handleClick} className="btn btn-primary">
        Add Note
      </button>
    </form>
  </div>

  )
}

export default AddNote