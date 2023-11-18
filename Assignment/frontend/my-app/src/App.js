import React from "react";
import {
  Landing,
  UserCard
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/users" element={<UserCard />} />
          {/* <Route exact path="/landing" element={<Landing1 />} /> */}

          {/* <Route exact path="/ActionLeft/:id" element={<ActionLeft />} />
          <Route exact path="/ProcessDone/:id" element={<ProcessDone />} /> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer /> {/* Place the ToastContainer at the root level */}
    </div>
  );
};

export default App;
