import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Alert from "../../../components/Alert";
import ProfileInfoCard from "../../../components/ProfileInfoCard";
import Sidebar from "../../../components/Sidebar";
import Skeleton from "../../../components/Skeleton";
import type { ProfileResponse } from "../../../types/api";

export const Route = createFileRoute("/admin/dashboard/")({
	component: RouteComponent,
});
const mockUserData = {
	nama: "John Doe",
	username: "johndoe123",
	jenisKelamin: "Laki-laki",
	alamat: "Jl. Merdeka No. 45, Jakarta",
	jenjang: "S1 Teknik Informatika",
	role: "Software Engineer",
	sambung: "+62 812-3456-7890",
};

function RouteComponent() {
	const [cookies] = useCookies(["access_token"]);
	const [alert, setAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const { isPending, error, data } = useQuery<ProfileResponse>({
		queryKey: ["remajaData"],
		queryFn: async () =>
			await fetch("http://localhost:8080/api/profile", {
				headers: {
					Authorization: `Bearer ${cookies.access_token}`,
				},
			})
				.then(async (res) => await res.json())
				.catch((error) => handleAlertError(error.message)),
	});

	const handleAlertError = (message: string) => {
		setAlertMessage(message);
		setAlert(true);
		setTimeout(() => {
			setAlert(false);
		}, 3000);
	};

	return (
		<div className="flex h-screen">
			{alert ? <Alert message={error?.message} type="error" /> : null}
			<Sidebar />

			<div className="min-h-screen bg-gray-50 p-6 w-full  ">
				<div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-8">
					<div className="flex items-center mb-8 space-x-4">
						<Icon
							icon="qlementine-icons:user-16"
							className="h-16 w-16 text-blue-500"
						/>
						<div>
							<h1 className="text-3xl font-bold text-gray-800">
								{isPending ? (
									<Skeleton className="h-7 w-full" />
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
									<Icon
										icon="uiw:information"
										className="h-6 w-6 text-blue-500"
									/>
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
									<Icon
										icon="uiw:information"
										className="h-6 w-6 text-green-500"
									/>
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
			</div>
		</div>
	);
}
