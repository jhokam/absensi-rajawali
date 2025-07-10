import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Cookies, useCookies } from "react-cookie";
import Button from "@/components/Button";
import TextError from "@/components/TextError";
import ThemedInput from "@/components/ThemedInput";
import {
	type LoginRequest,
	type LoginResponse,
	loginSchema,
} from "@/types/api";
import { api } from "@/utils/api";
import { useAlert } from "@/utils/useAlert";

export const Route = createFileRoute("/admin/login")({
	component: LoginPage,
	beforeLoad: async () => {
		const cookie = new Cookies();
		if (cookie.get("access_token")) {
			throw redirect({
				to: "/admin/dashboard",
			});
		}
	},
});

function LoginPage() {
	const [_, setCookie] = useCookies(["access_token"]);
	const { setAlert } = useAlert();
	const navigate = useNavigate();

	const handleLogin = async (data: LoginRequest) => {
		return await api("/auth/login", {
			method: "POST",
			body: JSON.stringify(data),
		});
	};

	const { mutateAsync, error, isError } = useMutation<
		LoginResponse,
		Error,
		LoginRequest
	>({
		mutationKey: ["login"],
		mutationFn: handleLogin,
		onSuccess: (data) => {
			setAlert(data.message, "success");
			setCookie("access_token", data.data.access_token, {
				expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
				secure: true,
				sameSite: "strict",
				path: "/admin",
			});
			navigate({
				to: "/admin/dashboard",
			});
		},
		onError: (error) => {
			setAlert(error.message, "error");
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

	useEffect(() => {
		if (isError) {
			setAlert(error.message, "error");
		}
	}, [isError, error]);

	return (
		<div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
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
					}}>
					<div>
						<form.Field name="username">
							{(field) => (
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
									<TextError field={field} />
								</>
							)}
						</form.Field>
					</div>
					<div>
						<form.Field name="password">
							{(field) => (
								<>
									<ThemedInput
										label="Password"
										htmlFor={field.name}
										type="password"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Password"
										required={true}
										className="flex-1"
									/>
									<TextError field={field} />
								</>
							)}
						</form.Field>
					</div>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<Button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "Memproses..." : "Masuk"}
							</Button>
						)}
					</form.Subscribe>
				</form>
			</div>
		</div>
	);
}
