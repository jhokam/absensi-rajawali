import Alert from "@/components/Alert.tsx";
import Button from "@/components/Button.tsx";
import TextError from "@/components/TextError.tsx";
import ThemedInput from "@/components/ThemedInput.tsx";
import type { LoginRequest, LoginResponse } from "@/types/api.ts";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { z } from "zod";

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
		const response = await fetch(
			`${import.meta.env.VITE_DEV_LINK}/auth/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		);
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message);
		}
		return response.json();
	};

	const { mutateAsync, error } = useMutation<
		LoginResponse,
		Error,
		LoginRequest
	>({
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
			await mutateAsync(values.value);
		},
		validators: {
			onChange: loginSchema,
		},
	});

	return (
		<div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
			{error && <Alert variant="error">{error.message}</Alert>}
			<img
				src="/logo-rajawali.png"
				className="h-24 mb-10"
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
								<>
									<ThemedInput
										label="Username"
										htmlFor={field.name}
										type="text"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="JohnDoe"
										required={true}
									/>
									{field.state.meta.errors.length > 0 ? (
										<TextError>{field.state.meta.errors.join(", ")}</TextError>
									) : null}
								</>
							)}
						/>
					</div>
					<div>
						<form.Field
							name="password"
							children={(field) => (
								<>
									<ThemedInput
										label="Password"
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
									/>
									{field.state.meta.errors.length > 0 ? (
										<TextError>{field.state.meta.errors.join(", ")}</TextError>
									) : null}
								</>
							)}
						/>
					</div>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}
						children={([canSubmit, isSubmitting]) => (
							<Button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "Memproses..." : "Masuk"}
							</Button>
						)}
					/>
				</form>
			</div>
		</div>
	);
}
