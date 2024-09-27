import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import { toast } from "sonner";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
    const { signup } = useAuth();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [organization, setOrganization] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword)
                return toast("passwords don't match");
            await signup(firstName, lastName, email, organization, password);
        } catch (err) {
            toast(err as string);
        }
    };

    return (
        <AuthLayout title={"Create your account"}>
            <div>
                <form onSubmit={handleSignUp}>
                    <div className="grid grid-cols-2 gap-5">
                        <Input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            label="First Name"
                            required={true}
                            onChange={(value) => setFirstName(value)}
                        />
                        <Input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            label="Last Name"
                            required={true}
                            onChange={(value) => setLastName(value)}
                        />
                    </div>

                    <Input
                        type="email"
                        name="email"
                        placeholder="email@example.com"
                        label="Email"
                        required={true}
                        onChange={(value) => setEmail(value)}
                    />
                    <Input
                        type="text"
                        name="organization"
                        placeholder="Company Name"
                        label="Organization Name"
                        required={true}
                        onChange={(value) => setOrganization(value)}
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        label="Password"
                        required={true}
                        onChange={(value) => setPassword(value)}
                    />
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        required={true}
                        onChange={(value) => setConfirmPassword(value)}
                    />

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="terms"
                                aria-describedby="terms"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                                required
                            />
                        </div>{" "}
                        <div className="ml-3 text-sm">
                            <label
                                htmlFor="terms"
                                className="font-light text-gray-500 dark:text-gray-300"
                            >
                                I accept the{" "}
                                <a
                                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    href="#"
                                >
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>
                    </div>

                    <Button type="submit" label="Create an account" />

                    <p className="text-sm mt-5 font-light text-gray-500 dark:text-gray-400">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        >
                            Login here
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;
