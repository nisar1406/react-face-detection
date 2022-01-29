import React, { Suspense } from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Navbar } from "./components";
import { NotFound } from "./pages";

import "./App.css";
import routes from "./routes";

const App = () => {

  const renderRoutes = (route) => {
    const Component = route?.component;
    return (
      <Route
        key={uuidv4()}
        path={route?.path}
        exact={route?.exact}
        element={<Component />}
      />
    );
  };

  return (
    <Router>
      <Suspense fallback={<div />}>
        <div className="app">
          <div className="gradient__bg">
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            {routes && routes.map((route) => renderRoutes(route))}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
