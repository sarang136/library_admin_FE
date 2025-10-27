// src/App.jsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import appRoutes from "./user/routes/appRoutes";
import ProtectedRoute from "./user/routes/ProtectedRoute";

// Lazy load main layout and login page
const AdminLayout = lazy(() => import("./user/AdminLayout"));
const LoginPage = lazy(() => import("./user/pages/LoginPage"));

function App() {
  return (
    <>
      {/* Global Toast notifications */}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <Router>
        {/* Suspense wraps all lazy-loaded components */}
        <Suspense
          fallback={
            <div className="h-screen flex items-center justify-center text-lg text-gray-500">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Public Login Page */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              {/* Map all other lazy-loaded routes */}
              {appRoutes
                .filter((route) => route.path !== "/login")
                .map((route) => (
                  <Route
                    key={route.path}
                    path={route.path === "/" ? "" : route.path.replace("/", "")}
                    element={<route.component />}
                  />
                ))}
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
