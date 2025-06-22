import cn from "@/utils/cn";
import { cva } from "class-variance-authority";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type AlertProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
> & {
	variant: "success" | "error";
};

const alertVariants = cva(
	"fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 border text-white flex items-center gap-2 z-50",
	{
		variants: {
			variant: {
				success: "bg-green-500 border-green-600",
				error: "bg-red-500 border-red-600",
			},
		},
		defaultVariants: {
			variant: "success",
		},
	},
);

export default function Alert({
	children,
	variant,
	className,
	...props
}: AlertProps) {
	return (
		<div className={cn(alertVariants({ variant, className }))} {...props}>
			<span className="font-medium">{children}</span>
		</div>
	);
}
