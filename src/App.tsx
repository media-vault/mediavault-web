import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MediaPage from "./pages/MediaPage";
import EditMediaPage from "./pages/EditMediaPage";
import StreamPage from "./pages/StreamPage";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/media" element={<MediaPage />} />
            <Route path="/media/edit/:id" element={<EditMediaPage />} />
            <Route path="/stream/:id" element={<StreamPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
  );
}

export default App;
