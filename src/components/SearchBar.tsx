import type { ChangeEvent } from "react";
import ThemedButton from "./ThemedButton";

export default function SearchBar({
	onChange,
	value,
	placeholder,
	disabled,
}: {
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	placeholder: string;
	disabled?: boolean;
}) {
	return (
		<div className="flex items-center">
			<input
				type="search"
				className="border border-gray-300 rounded-md p-2 w-96"
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				disabled={disabled}
			/>
			<ThemedButton type="button">Search</ThemedButton>
		</div>
	);
}
