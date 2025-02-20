import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Dialog from "../components/Dialog";
import ThemedButton from "./ThemedButton";

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
			<div className="py-6 px-8">
				<Link
					to="/admin/dashboard"
					className="text-2xl font-bold text-gray-800"
				>
					Home
				</Link>
			</div>
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
						to="/admin/dashboard/remaja"
						className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-800"
					>
						Remaja
					</Link>
				</li>
			</ul>
			<div className="py-4 px-8 border-t mt-auto">
				<ThemedButton
					type="button"
					onClick={() => setLogoutDialog(true)}
					className="w-full"
				>
					Logout
				</ThemedButton>
			</div>
			{logoutDialog && (
				<Dialog
					title="blablabla"
					description="hi"
					cancel="Cancel"
					confirm="Yes, Logout"
					handleCancel={() => setLogoutDialog(false)}
					handleConfirm={handleLogout}
				/>
			)}
		</div>
	);
}
