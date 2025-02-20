export default function Alert({
	type,
	message,
}: {
	type: "success" | "error";
	message: string | undefined;
}) {
	return (
		<div
			className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ${
				type === "success"
					? "bg-green-500 border-green-600"
					: "bg-red-500 border-red-600"
			} border text-white flex items-center gap-2 z-50`}
		>
			<span className="font-medium">{message}</span>
		</div>
	);
}
