import { IoCogOutline, IoLogOutOutline, IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode, useState } from "react";
import { API_URL } from "../config";

function DropdownMenu({
    options,
}: {
    options: { label: string; icon?: ReactNode; action: () => void }[];
}) {
    const { userData } = useAuth();
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            {isVisible && (
                <div
                    className="fixed inset-0"
                    onClick={() => setIsVisible(false)}
                ></div>
            )}
            <div className="relative">
                <img
                    className="w-10 h-10 rounded-full ml-4 mx-2 cursor-pointer"
                    onClick={() => setIsVisible((prev) => !prev)}
                    src={
                        userData?.avatar
                            ? `${API_URL}/static/${userData.avatar}`
                            : "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png"
                    }
                />
                {isVisible && (
                    <div className="w-48 py-2 mt-4 z-10 bg-white rounded-lg absolute right-0 shadow-xl border overflow-hidden border-gray-200">
                        <div className="p-4 border-b border-gray-200 cursor-default mb-2">
                            <div>
                                {userData?.firstName} {userData?.lastName}
                            </div>
                            <div className="text-gray-500">
                                {userData?.email}
                            </div>
                        </div>
                        {options.map((option) => (
                            <div
                                onClick={() => {
                                    setIsVisible(false);
                                    option.action();
                                }}
                                key={option.label}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-200 transition-all flex"
                            >
                                <span className="text-lg mt-1 mr-2">
                                    {option.icon && option.icon}
                                </span>
                                {option.label}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

function SearchBox() {
    return (
        <div className="ml-auto flex relative">
            <IoSearch className="pointer-events-none text-xl mt-2 ml-3 text-gray-500 absolute" />
            <input
                className="block w-full rounded-md border border-transparent bg-gray-700 transition-all py-1.5 pl-10 pr-3 leading-5 text-gray-300 placeholder-gray-400 focus:border-white focus:bg-white focus:text-gray-900 focus:outline-none focus:ring-white sm:text-smbg-transparent outline-none"
                type="text"
                placeholder="Search"
            />
        </div>
    );
}

export default function Navbar() {
    const { logout } = useAuth();

    return (
        <div className="bg-gray-800 flex p-2">
            <img
                className="w-10"
                src={
                    "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                }
            />
            <text className="text-white roboto-medium my-2 ml-4">
                Quick Connect
            </text>

            <Link
                to="/"
                className="text-gray-400 mx-8 py-2 px-4 hover:bg-gray-600 hover:text-white rounded-md transition-all"
            >
                Change Log
            </Link>

            <SearchBox />
            <DropdownMenu
                options={[
                    {
                        label: "Settings",
                        icon: <IoCogOutline />,
                        action: () => {},
                    },
                    {
                        label: "Log Out",
                        icon: <IoLogOutOutline />,
                        action: () => logout(),
                    },
                ]}
            />
        </div>
    );
}
