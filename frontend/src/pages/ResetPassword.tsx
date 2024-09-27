import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../layouts/AuthLayout";
import { toast } from "sonner";
import Input from "../components/Input";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
    const { resetPassword } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (password !== confirmPassword)
                return toast("passwords don't match");
            await resetPassword(email, password);

            toast("Password reset complete, redirecting...");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            toast(err as string);
        }
    };

    return (
        <AuthLayout title={"Set your Password"}>
            <div>
                <form onSubmit={handleReset}>
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
                    <Input
                        type="password"
                        name="password"
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        required={true}
                        onChange={(value) => setConfirmPassword(value)}
                    />

                    <Button type="submit" label="Set Password" />
                </form>
            </div>
        </AuthLayout>
    );
};

export default ResetPassword;
