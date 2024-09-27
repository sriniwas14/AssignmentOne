import { ReactNode } from "react";
import Navbar from "../components/Navbar";

export default function DashLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
}
