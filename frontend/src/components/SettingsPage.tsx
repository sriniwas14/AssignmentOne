import { ReactNode } from "react";

export default function SettingsPage({
    title,
    subtitle,
    children,
}: {
    title: string;
    subtitle: string;
    children: ReactNode;
}) {
    return (
        <div>
            <h1 className="text-lg font-semibold dark:text-white">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
                {subtitle}
            </p>
            <br />
            <div>{children}</div>
        </div>
    );
}
