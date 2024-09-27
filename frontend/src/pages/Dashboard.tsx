import React, { useEffect, useState } from "react";
import DashLayout from "../layouts/DashLayout";
import AvatarPicker from "../components/AvatarPicker";
import SettingsPage from "../components/SettingsPage";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
    const { userData, updateProfile } = useAuth();
    const [firstName, setFirstName] = useState(userData?.firstName);
    const [lastName, setLastName] = useState(userData?.lastName);
    const [email, setEmail] = useState(userData?.email);

    useEffect(() => {
        setFirstName(userData?.firstName);
        setLastName(userData?.lastName);
        setEmail(userData?.email);
    }, [userData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const toUpdate = {} as {
            firstName?: string;
            lastName?: string;
            email?: string;
        };

        if (firstName !== "" || firstName !== userData?.firstName)
            toUpdate["firstName"] = firstName;

        if (lastName !== "" || lastName !== userData?.lastName)
            toUpdate["lastName"] = lastName;

        if (email !== "" || email !== userData?.email)
            toUpdate["email"] = email;

        try {
            await updateProfile(toUpdate);
        } catch (error) {
            toast(error as string);
        }

        toast("Updated");
    };

    return (
        <DashLayout>
            <div className="contents">
                <div className="mx-auto max-w-7xl my-10">
                    <SettingsPage
                        title="Profile Settings"
                        subtitle="Change your personal profile settings"
                    >
                        <p className="mb-2">Upload Avatar</p>
                        <AvatarPicker />

                        <form onSubmit={handleSubmit} className="mt-4 w-1/3">
                            <Input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                label="First Name"
                                defaultValue={firstName}
                                required={true}
                                onChange={(value) => setFirstName(value)}
                            />
                            <Input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                label="Last Name"
                                defaultValue={lastName}
                                required={true}
                                onChange={(value) => setLastName(value)}
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="email@example.com"
                                label="Email"
                                defaultValue={email}
                                required={true}
                                onChange={(value) => setEmail(value)}
                            />

                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Save
                            </button>
                        </form>
                    </SettingsPage>
                </div>
            </div>
        </DashLayout>
    );
};

export default Dashboard;
