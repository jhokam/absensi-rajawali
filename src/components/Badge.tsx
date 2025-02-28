import { cva } from "class-variance-authority";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "../utils/cn";

type BadgeProps = DetailedHTMLProps<
	HTMLAttributes<HTMLSpanElement>,
	HTMLSpanElement
> & {
	color:
		| "blue"
		| "green"
		| "red"
		| "gray"
		| "pink"
		| "yellow"
		| "orange"
		| "purple"
		| "teal";
	size: "small" | "medium" | "large";
};

const BadgeVariants = cva("inline-block rounded-full font-medium", {
	variants: {
		size: {
			small: "text-xs px-2 py-1",
			medium: "text-sm px-3 py-1.5",
			large: "text-base px-4 py-2",
		},
		color: {
			blue: "bg-blue-100 text-blue-800",
			green: "bg-green-100 text-green-800",
			red: "bg-red-100 text-red-800",
			gray: "bg-gray-100 text-gray-800",
			pink: "bg-pink-100 text-pink-800",
			yellow: "bg-yellow-100 text-yellow-800",
			orange: "bg-orange-100 text-orange-800",
			purple: "bg-purple-100 text-purple-800",
			teal: "bg-teal-100 text-teal-800",
		},
	},
});

export default function Badge({
	color,
	size,
	className,
	...props
}: BadgeProps) {
	return (
		<span
			className={cn("", BadgeVariants({ color, size, className }))}
			{...props}
		/>
	);
}
