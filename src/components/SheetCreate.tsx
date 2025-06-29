import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { z } from "zod";
import {
	jenisKelaminOptions,
	jenjangOptions,
	roleOptions,
	sambungOptions,
} from "@/constants";
import type { GenerusRequest, GenerusResponse } from "@/types/generus";
import Button from "./Button";
import TextError from "./TextError";
import ThemedInput from "./ThemedInput";
import ThemedSelect from "./ThemedSelect";

export default function SheetCreate({
	closeSheet,
}: {
	closeSheet: () => void;
}) {
	const [cookies] = useCookies(["access_token"]);

	const createGenerusSchema = z.object({
		nama: z.string().nonempty("Nama tidak boleh kosong"),
		username: z.string().nonempty("Username tidak boleh kosong"),
		jenis_kelamin: z.enum(["Laki_Laki", "Perempuan"], {
			required_error: "Jenis Kelamin tidak boleh kosong",
		}),
		jenjang: z.enum(
			["Paud", "Caberawit", "Pra_Remaja", "Remaja", "Pra_Nikah"],
			{
				required_error: "Jenjang tidak boleh kosong",
			},
		),
		alamat: z.string().nonempty("Alamat tidak boleh kosong"),
		sambung: z.enum(["Aktif", "Tidak_Aktif"], {
			required_error: "Sambung tidak boleh kosong",
		}),
		role: z.enum(["Admin", "User"], {
			required_error: "Role tidak boleh kosong",
		}),
		password: z.string().nonempty("Password tidak boleh kosong"),
	});

	const { mutateAsync, isError, error } = useMutation<
		GenerusResponse,
		Error,
		GenerusRequest
	>({
		mutationFn: async (data: GenerusRequest) => {
			const response = await fetch(`${import.meta.env.DEV_LINK}/generus`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${cookies.access_token}`,
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message);
			}

			return response.json();
		},
	});

	const form = useForm<GenerusRequest>({
		defaultValues: {
			nama: "",
			username: "",
			jenis_kelamin: "Laki_Laki",
			jenjang: "Paud",
			alamat: "",
			sambung: "Tidak_Aktif",
			role: "User",
			password: "",
		},
		onSubmit: async ({ value }) => {
			await mutateAsync(value);
			closeSheet();
		},
		validators: {
			onSubmit: createGenerusSchema,
		},
	});

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
				<h1 className="text-2xl font-bold mb-6 text-gray-800">
					Buat Data Generus
				</h1>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-4"
				>
					<div className="space-y-4">
						<form.Field
							name="nama"
							children={(field) => (
								<>
									<ThemedInput
										label="Nama"
										variant="secondary"
										htmlFor={field.name}
										type="text"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="John Doe"
										required={true}
										className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									{field.state.meta.errors.length > 0 ? (
										<TextError>{field.state.meta.errors.join(", ")}</TextError>
									) : null}
								</>
							)}
						/>

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
										placeholder="john"
										required={true}
										className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									{field.state.meta.errors.length > 0 ? (
										<TextError>{field.state.meta.errors.join(", ")}</TextError>
									) : null}
								</>
							)}
						/>

						<form.Field
							name="jenis_kelamin"
							children={(field) => (
								<div className="space-y-1">
									<ThemedSelect
										name={field.name}
										label="Jenis Kelamin"
										options={jenisKelaminOptions}
										field={field}
										placeholder="Pilih Jenis Kelamin"
										required={true}
									/>
								</div>
							)}
						/>

						<form.Field
							name="jenjang"
							children={(field) => (
								<div className="space-y-1">
									<ThemedSelect
										name={field.name}
										label="Jenjang"
										options={jenjangOptions}
										field={field}
										placeholder="Pilih Jenjang"
										required={true}
									/>
								</div>
							)}
						/>

						<form.Field
							name="alamat"
							children={(field) => (
								<>
									<ThemedInput
										label="Alamat"
										htmlFor={field.name}
										type="text"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="Jl. Madukoro No. 1"
										required={true}
										className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									{field.state.meta.errors.length > 0 ? (
										<TextError>{field.state.meta.errors.join(", ")}</TextError>
									) : null}
								</>
							)}
						/>

						<form.Field
							name="sambung"
							children={(field) => (
								<div className="space-y-1">
									<ThemedSelect
										name={field.name}
										label="Sambung"
										options={sambungOptions}
										field={field}
										placeholder="Pilih Sambung"
										required={true}
									/>
								</div>
							)}
						/>

						<form.Field
							name="role"
							children={(field) => (
								<div className="space-y-1">
									<ThemedSelect
										name={field.name}
										label="Role"
										options={roleOptions}
										field={field}
										placeholder="Pilih Role"
										required={true}
									/>
								</div>
							)}
						/>

						<form.Field
							name="password"
							children={(field) => (
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
										placeholder="Make sure it's strong"
										required={true}
										className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									{field.state.meta.errors.length > 0 ? (
										<TextError>{field.state.meta.errors.join(", ")}</TextError>
									) : null}
								</>
							)}
						/>
					</div>

					<div className="flex justify-end space-x-4 mt-6">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button type="submit" disabled={!canSubmit}>
									{isSubmitting ? "Memproses..." : "Submit"}
								</Button>
							)}
						/>
						<Button
							type="button"
							onClick={closeSheet}
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
						>
							Close
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
