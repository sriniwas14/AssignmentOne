export default function Input({
    type,
    name,
    label,
    placeholder,
    defaultValue,
    required,
    onChange,
}: {
    type: "text" | "password" | "email";
    name: string;
    label: string;
    placeholder: string;
    defaultValue?: string;
    required: boolean;
    onChange: (value: string) => void;
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="roboto-regular block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                placeholder={placeholder}
                required={required}
                defaultValue={defaultValue}
                className="bg-gray-50 border mb-5 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
