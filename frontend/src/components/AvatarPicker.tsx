import React, { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { API_URL } from "../config";

export default function AvatarPicker() {
    const { updateProfilePic } = useAuth();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                await updateProfilePic(file);
                toast("profile picture updated!");
            } catch (error) {
                toast(error as string);
            }
        }
    };

    const { userData } = useAuth();

    return (
        <div className="relative overflow-hidden rounded-xl">
            <span
                onClick={() => fileInputRef.current?.click()}
                className="absolute w-24 inset-0 text-white bg-black/40 cursor-pointer opacity-0 hover:opacity-100 transition-all px-5 pt-9 rounded-full"
            >
                Upload
            </span>
            <img
                className="w-24 h-24 rounded-full"
                src={
                    userData?.avatar
                        ? `${API_URL}/static/${userData.avatar}`
                        : "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                }
            />
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the input
            />
        </div>
    );
}
