import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

export default function ThemedButton({
	children,
	type,
	disabled = false,
	onClick,
	className,
	variant = "primary",
}: {
	children: ReactNode;
	type: "button" | "submit" | "reset";
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
	variant?: ButtonVariant;
}) {
	const getVariantClasses = (variant: ButtonVariant) => {
		const variants = {
			primary: ` bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 text-white
      `,
			secondary: ` bg-white hover:bg-gray-100 focus:ring-gray-200 text-gray-900 border border-gray-300
      `,
		};

		return variants[variant];
	};

	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={`
        font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:ring-4 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${getVariantClasses(variant)} ${className}
      `}
		>
			{children}
		</button>
	);
}
