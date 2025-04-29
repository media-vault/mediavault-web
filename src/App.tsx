import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MediaPage from "./pages/MediaPage";
import EditMediaPage from "./pages/EditMediaPage";
import AddMediaPage from "./pages/AddMediaPage";
import StreamPage from "./pages/StreamPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ConnectPage from "./pages/ConnectPage";

import { isStandaloneClient } from './utils/env';

function App() {
  return (
      <Router>
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={
                isStandaloneClient() ? <Navigate to="/connect" replace /> : <HomePage />
            } />

            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
                <Route path="/media" element={<MediaPage />} />
                <Route path="/media/add" element={<AddMediaPage />} />
                <Route path="/media/edit/:id" element={<EditMediaPage />} />
                <Route path="/stream/:id" element={<StreamPage />} />
            </Route>

            {/* Undefined Routes */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
  );
}

export default App;
