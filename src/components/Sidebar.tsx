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
			to: "/login",
		});
	};

	return (
		<div className="bg-amber-200 w-1/4 border-r h-fit flex flex-col items-center justify-center">
			{/* <img src="/logo-rajawali.png" className="h-11 " alt="Logo Rajawali" /> */}
			<Link to="/" className="text-2xl font-bold text-gray-800">
				Dashboard
			</Link>
			<Link to="/remaja" className="text-2xl font-bold text-gray-800">
				Remaja
			</Link>
			<ThemedButton type="button" onClick={() => setLogoutDialog(true)}>
				Logout
			</ThemedButton>
			{logoutDialog ? (
				<Dialog
					title="blablabla"
					description="hi"
					cancel="Cancel"
					confirm="Yes, Logout"
					handleCancel={() => {
						setLogoutDialog(false);
					}}
					handleConfirm={() => handleLogout()}
				/>
			) : null}
		</div>
	);
}
