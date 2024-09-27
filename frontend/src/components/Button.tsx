export default function Button({
    type,
    label,
}: {
    type: "submit" | "reset" | "button";
    label: string;
}) {
    return (
        <button
            className="w-full mt-4 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type={type}
        >
            {label}
        </button>
    );
}
