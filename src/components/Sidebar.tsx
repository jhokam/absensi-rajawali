import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Dialog from "../components/Dialog";
import Button from "./Button";

export default function Sidebar() {
	const [logoutDialog, setLogoutDialog] = useState(false);
	const [cookies, setCookie, removeCookie] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const handleLogout = () => {
		removeCookie("access_token");
		setLogoutDialog(false);
		navigate({
			to: "/admin/login",
		});
	};

	return (
		<div className="bg-gray-50 h-screen w-64 flex flex-col shadow-md">
			<img
				src="/logo-rajawali.png"
				alt="Logo Rajawali"
				className="w-28 self-center py-5"
			/>
			<ul className="flex-grow space-y-2 px-4">
				<li>
					<Link
						to="/admin/dashboard"
						className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-800"
					>
						Dashboard
					</Link>
				</li>
				<li>
					<Link
						to="/admin/dashboard/desa"
						className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-800"
					>
						Desa
					</Link>
				</li>
				<li>
					<Link
						to="/admin/dashboard/kelompok"
						className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-800"
					>
						Kelompok
					</Link>
				</li>
				<li>
					<Link
						to="/admin/dashboard/generus"
						className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-800"
					>
						Generus
					</Link>
				</li>
			</ul>
			<div className="py-4 px-8 border-t mt-auto">
				<Button
					type="button"
					onClick={() => setLogoutDialog(true)}
					className="w-full"
				>
					Logout
				</Button>
			</div>
			{logoutDialog && (
				<Dialog
					title="Logout"
					description="Are you sure you want to Logout?"
					cancel="Cancel"
					confirm="Yes, Logout"
					handleCancel={() => setLogoutDialog(false)}
					handleConfirm={handleLogout}
				/>
			)}
		</div>
	);
}
