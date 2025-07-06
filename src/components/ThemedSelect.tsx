interface SelectOption {
	value: string;
	label: string;
}

interface SelectFieldProps {
	name: string;
	label: string;
	options: SelectOption[];
	placeholder?: string;
	field: any;
	required?: boolean;
}

export default function ThemedSelect({
	name,
	label,
	options,
	placeholder = "Select an option",
	field,
	required = false,
}: SelectFieldProps) {
	return (
		<div className="space-y-2">
			<label htmlFor={name} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<select
				id={name}
				name={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				onBlur={field.handleBlur}
				required={required}
				className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
				<option value="" disabled>
					{placeholder}
				</option>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
