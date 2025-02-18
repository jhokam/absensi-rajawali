import { Icon } from "@iconify/react";
import { type ChangeEvent, type FocusEvent, useState } from "react";

export default function ThemedInput({
	htmlFor,
	type,
	name,
	id,
	value,
	onBlur,
	onChange,
	placeholder,
	className,
	required,
}: {
	htmlFor: string;
	type: "text" | "password" | "email" | "tel" | "number";
	name: string;
	id: string;
	value: string;
	onBlur: (event: FocusEvent<HTMLInputElement>) => void;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	className?: string;
	required: boolean;
	buttonClick?: () => void;
}) {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<label
				htmlFor={htmlFor}
				className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
			>
				{placeholder}
			</label>
			<div
				className={`flex space-x-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${className}`}
			>
				<input
					type={type === "password" && showPassword ? "text" : type}
					name={name}
					id={id}
					value={value}
					onBlur={onBlur}
					onChange={onChange}
					placeholder={placeholder}
					className="focus:outline-none w-full"
					required={required}
				/>
				{type === "password" && (
					<button type="button" onClick={() => setShowPassword(!showPassword)}>
						<Icon
							icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
							color="white"
							width={20}
						/>
					</button>
				)}
			</div>
		</>
	);
}
