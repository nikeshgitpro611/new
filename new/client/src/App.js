import { BrowserRouter, Routes, Route,} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AddEdit from "./pages/AddEdit";
import Home from "./pages/Home";
import View from "./pages/View";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <ToastContainer position="top-center" />
        
        <Routes>
        <Route >
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<div>Hello about</div>} />
          <Route path="/Addcontact" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
      
       
       
      </div>
    </BrowserRouter>
  );
}

export default App;
