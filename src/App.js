import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
// imported for routers
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {
  return (
    <>
      {/* navbar component containing variables (props) */}
      {/* note sate is wrapped outside the whole app */}
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert message="This is an amazing app" />
          <div className="container">
            {/* setup of the router here */}

            <Routes>
              {/* for complete matching of components use exact path not path (uses partial matching) */}
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />

              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}
export default App;
