import type { DetailedHTMLProps, HTMLAttributes } from "react";

export default function TextError({
	...props
}: DetailedHTMLProps<
	HTMLAttributes<HTMLParagraphElement>,
	HTMLParagraphElement
>) {
	return <p className="text-red-500" {...props} />;
}
