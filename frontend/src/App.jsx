import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VarifyEmail";
import Dashboard from "./pages/Dashboard";
import AddNote from "./pages/AddNotes";
import ShowAllNotes from "./pages/ShowAllNotes";
import UpdateModal from "./pages/UpdateModal";

export default function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/verify/:token" element={<VerifyEmail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addnote" element={<AddNote />} />
      <Route path="/getnotes" element={<ShowAllNotes />} />
      <Route path="/update/:id" element={<UpdateModal />} />




  </Routes>
    </BrowserRouter>
    </>
  )
}