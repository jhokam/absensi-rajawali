import { Icon } from "@iconify/react";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import ThemedButton from "../../components/ThemedButton.tsx";

export const Route = createFileRoute("/(auth)/login")({
	component: LoginPage,
});

const loginSchema = z.object({
	username: z.string().nonempty("Username tidak boleh kosong"),
	password: z.string().nonempty("Password tidak boleh kosong"),
});

function LoginPage() {
	const [showPassword, setShowPassword] = useState(false);
	const form = useForm({
		defaultValues: {
			username: "",
			password: "",
		},
		onSubmit: async (values) => {
			console.log(values);
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
								<>
									<label
										htmlFor="username"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Username
									</label>
									<input
										type="text"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
										placeholder="JohnDoe"
										required={true}
									/>
								</>
							)}
						/>
					</div>
					<div>
						<form.Field
							name="password"
							children={(field) => (
								<>
									<label
										htmlFor="password"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Password
									</label>
									<div className="flex space-x-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
										<input
											type={showPassword ? "text" : "password"}
											name={field.name}
											id={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											placeholder="••••••••"
											className="focus:outline-none w-full"
											required={true}
										/>
										<button
											type="button"
											className=""
											onClick={() => setShowPassword(!showPassword)}
										>
											<Icon
												icon={showPassword ? "mdi:eye" : "mdi:eye-off"}
												color="white"
												width={20}
											/>
										</button>
									</div>
								</>
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
