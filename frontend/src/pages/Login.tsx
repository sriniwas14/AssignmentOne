import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import { toast } from "sonner";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await login(email, password);
        } catch (err) {
            toast(err as string);
        }
    };

    return (
        <AuthLayout title={"Sign in to your account"}>
            <div>
                <form onSubmit={handleLogin}>
                    <Input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        label="Email"
                        required={true}
                        onChange={(value) => setEmail(value)}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        label="Password"
                        required={true}
                        onChange={(value) => setPassword(value)}
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    aria-describedby="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                />
                            </div>{" "}
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="remember"
                                    className="text-gray-500 dark:text-gray-300"
                                >
                                    Remember me
                                </label>
                            </div>
                        </div>{" "}
                        <Link
                            to="/reset-password"
                            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" label="Sign in" />

                    <p className="text-sm mt-5 font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?{" "}
                        <Link
                            to="/signup"
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;
