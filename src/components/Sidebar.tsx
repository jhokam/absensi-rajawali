import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Dialog from "../components/Dialog";
import { SIDEBAR_MENU } from "../constants";
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
				{SIDEBAR_MENU.map((item) => (
					<li key={item.title}>
						<Link
							to={item.link}
							className="block py-2 px-4 rounded-md hover:bg-gray-100 text-gray-800"
						>
							{item.title}
						</Link>
					</li>
				))}
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
					description="Apakah yakin kamu mau login?"
					cancel="Tidak"
					confirm="Ya, Logout"
					handleCancel={() => setLogoutDialog(false)}
					handleConfirm={handleLogout}
				/>
			)}
		</div>
	);
}
