export default function Skeleton({ className }: { className?: string }) {
	return (
		<div
			className={`bg-gray-200 rounded-full dark:bg-gray-700 mb-4 ${className}`}
		/>
	);
}
