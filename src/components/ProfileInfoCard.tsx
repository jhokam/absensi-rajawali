import type { ReactNode } from "react";

export default function ProfileInfoCard({
	title,
	icon,
	details,
}: {
	title: string;
	icon?: ReactNode;
	details: { label: string; value: string | undefined }[];
}) {
	return (
		<div className="bg-gray-100 rounded-lg p-6 space-y-4">
			<div className="flex items-center space-x-3 mb-4">
				{icon}
				<h2 className="text-xl font-semibold text-gray-800">{title}</h2>
			</div>
			{details.map((detail) => (
				<div
					key={detail.label}
					className="border-b border-gray-200 pb-2 last:border-b-0">
					<p className="text-sm text-gray-500">{detail.label}</p>
					<p className="text-gray-800 font-medium">{detail.value}</p>
				</div>
			))}
		</div>
	);
}
