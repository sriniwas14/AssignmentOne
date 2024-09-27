import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SignUp from "./pages/SignUp";
import { Toaster } from "sonner";
import ResetPassword from "./pages/ResetPassword";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <SignUp />
                            </PublicRoute>
                        }
                    />
                    <Route
                        path="/reset-password"
                        element={
                            <PublicRoute>
                                <ResetPassword />
                            </PublicRoute>
                        }
                    />

                    {/* Private Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <PrivateRoute>
                                <Settings />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
            <Toaster
                theme={"system"}
                duration={1000}
                position="top-right"
                closeButton={true}
                richColors={true}
            />
        </AuthProvider>
    );
};

export default App;
