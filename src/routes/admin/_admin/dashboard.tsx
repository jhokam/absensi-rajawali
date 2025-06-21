import Alert from "@/components/Alert";
import ProfileInfoCard from "@/components/ProfileInfoCard";
import Skeleton from "@/components/Skeleton";
import type { GenerusResponse } from "@/types/api";
import { useProfile } from "@/utils/useProfile";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCookies } from "react-cookie";

export const Route = createFileRoute("/admin/_admin/dashboard")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		console.log(context.authentication.role);
		if (
			context.authentication.role === "User"
			// context.authentication.role === null
		) {
			throw redirect({
				to: "/admin/login",
			});
		}
	},
});

function RouteComponent() {
	const [cookies] = useCookies(["access_token"]);
	const { setRole } = useProfile();

	const { isPending, error, data } = useQuery<GenerusResponse>({
		queryKey: ["generusData"],
		queryFn: async () =>
			await fetch(`${import.meta.env.VITE_DEV_LINK}/profile`, {
				headers: {
					Authorization: `Bearer ${cookies.access_token}`,
				},
			}).then(async (res) => await res.json()),
	});

	if (data) {
		setRole(data.data.role);
	}

	return (
		<div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
			{error && <Alert variant="error">{error.message}</Alert>}
			<div className="flex items-center mb-8 space-x-4">
				<Icon
					icon="qlementine-icons:user-16"
					className="h-16 w-16 text-blue-500"
				/>
				<div>
					<h1 className="text-3xl font-bold text-gray-800">
						{isPending ? (
							<Skeleton className="h-7 w-full bg-red-50" />
						) : (
							`Hi, ${data?.data.nama}!`
						)}
					</h1>
					<p className="text-gray-500">Welcome to your dashboard</p>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				{isPending ? (
					<Skeleton className="p-6 w-full" />
				) : (
					<ProfileInfoCard
						title="Personal Information"
						icon={
							<Icon icon="uiw:information" className="h-6 w-6 text-blue-500" />
						}
						details={[
							{ label: "Nama", value: data?.data.nama },
							{ label: "Username", value: data?.data.username },
							{ label: "Jenis Kelamin", value: data?.data.jenis_kelamin },
						]}
					/>
				)}

				{isPending ? (
					<Skeleton className="p-6 w-full" />
				) : (
					<ProfileInfoCard
						title="Professional Details"
						icon={
							<Icon icon="uiw:information" className="h-6 w-6 text-green-500" />
						}
						details={[
							{ label: "Alamat", value: data?.data.alamat },
							{ label: "Jenjang", value: data?.data.jenjang },
							{ label: "Role", value: data?.data.role },
						]}
					/>
				)}
			</div>
		</div>
	);
}
