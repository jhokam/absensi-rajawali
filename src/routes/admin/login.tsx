import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { z } from "zod";
import ThemedButton from "../../components/ThemedButton.tsx";
import ThemedInput from "../../components/ThemedInput.tsx";
import type { LoginRequest, LoginResponse } from "../../types/api.ts";

export const Route = createFileRoute("/admin/login")({
	component: LoginPage,
});

const loginSchema = z.object({
	username: z.string().nonempty("Username tidak boleh kosong"),
	password: z.string().nonempty("Password tidak boleh kosong"),
});

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [cookies, setCookie] = useCookies(["access_token"]);
	const navigate = useNavigate();

	const handleLogin = async (data: LoginRequest) => {
		const response = await fetch("http://localhost:8080/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		return response.json();
	};

	const { mutateAsync } = useMutation<LoginResponse, Error, LoginRequest>({
		mutationKey: ["login"],
		mutationFn: handleLogin,
		onSuccess: (data) => {
			setCookie("access_token", data.data.access_token);
			navigate({
				to: "/admin/dashboard",
			});
		},
	});

	const form = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		onSubmit: async (values) => {
			try {
				await mutateAsync(values.value);
			} catch (error) {
				console.log(error);
			}
		},
		validators: {
			onChange: loginSchema,
		},
	});

	return (
		<div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
			<img
				src="/logo-rajawali.png"
				className="h-11 lg:mb-10"
				alt="Logo Rajawali"
			/>
			{/* Card */}
			<div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
				<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
					Masuk ke akun Anda
				</h2>
				<form
					className="mt-8 space-y-6"
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<div>
						<form.Field
							name="username"
							children={(field) => (
								<ThemedInput
									htmlFor={field.name}
									type="text"
									name={field.name}
									id={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Username"
									required={true}
								/>
							)}
						/>
					</div>
					<div>
						<form.Field
							name="password"
							children={(field) => (
								<ThemedInput
									htmlFor={field.name}
									type={showPassword ? "text" : "password"}
									name={field.name}
									id={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="Password"
									required={true}
									className="flex-1"
									buttonClick={() => setShowPassword(!showPassword)}
								/>
							)}
						/>
					</div>
					<div className="flex items-start">
						<a
							href="/forgot-password"
							className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500"
						>
							Lupa Password?
						</a>
					</div>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<ThemedButton type="submit" disabled={!canSubmit}>
								{isSubmitting ? "Memproses..." : "Masuk"}
							</ThemedButton>
						)}
					/>
					<div className="text-sm font-medium text-gray-500 dark:text-gray-400">
						Belum punya akun?{" "}
						<a
							href="/register"
							className="text-primary-700 hover:underline dark:text-primary-500"
						>
							Buat akun baru
						</a>
					</div>
				</form>
			</div>
		</div>
	);
}
