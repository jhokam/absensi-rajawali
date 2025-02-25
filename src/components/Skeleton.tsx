import type { DetailedHTMLProps, HTMLAttributes } from "react";
import cn from "../utils/cn";

type SkeletonProps = DetailedHTMLProps<
	HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;
export default function Skeleton({ className }: SkeletonProps) {
	return (
		<div
			className={cn(
				"bg-gray-200 rounded-full dark:bg-gray-700 mb-4",
				className,
			)}
		/>
	);
}
