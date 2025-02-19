import type { ReactNode } from "@tanstack/react-router";

const Badge = ({
	text,
	color = "blue",
	size = "medium",
}: {
	text: string | boolean | ReactNode;
	color:
		| "blue"
		| "green"
		| "red"
		| "gray"
		| "pink"
		| "yellow"
		| "orange"
		| "purple"
		| "teal"
		| string;
	size: "small" | "medium" | "large";
}) => {
	const sizeClass = {
		small: "text-xs px-2 py-1",
		medium: "text-sm px-3 py-1.5",
		large: "text-base px-4 py-2",
	}[size];

	const colorClass = {
		blue: "bg-blue-100 text-blue-800",
		green: "bg-green-100 text-green-800",
		red: "bg-red-100 text-red-800",
		gray: "bg-gray-100 text-gray-800",
		pink: "bg-pink-100 text-pink-800",
		yellow: "bg-yellow-100 text-yellow-800",
		orange: "bg-orange-100 text-orange-800",
		purple: "bg-purple-100 text-purple-800",
		teal: "bg-teal-100 text-teal-800",
	}[color];

	return (
		<span
			className={`inline-block rounded-full font-medium  ${sizeClass} ${colorClass}`}
		>
			{text}
		</span>
	);
};

export default Badge;
