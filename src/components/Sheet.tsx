import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
	jenisKelaminOptions,
	jenjangOptions,
	roleOptions,
	sambungOptions,
} from "../constants";
import type { RemajaRequest, RemajaResponse } from "../types/api";
import ThemedButton from "./ThemedButton";
import ThemedInput from "./ThemedInput";
import ThemedSelect from "./ThemedSelect";

export default function Sheet({ closeSheet }: { closeSheet: () => void }) {
	const createRemajaSchema = z.object({
		nama: z.string().nonempty("Nama tidak boleh kosong"),
		username: z.string().nonempty("Username tidak boleh kosong"),
		jenis_kelamin: z.enum(["Laki-Laki", "Perempuan"], {
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
		RemajaResponse,
		Error,
		RemajaRequest
	>({
		mutationFn: async (data: RemajaRequest) => {
			const response = await fetch("http://localhost:8080/api/remaja", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
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

	const form = useForm({
		defaultValues: {
			nama: "",
			username: "",
			jenis_kelamin: "Laki-Laki", // Set a valid default
			jenjang: "Paud", // Set a valid default
			alamat: "",
			sambung: "Tidak_Aktif",
			role: "User",
			password: "",
		},
		onSubmit: async ({ value }) => {
			try {
				const result = await mutateAsync(value);
				console.log("Success:", result);
				closeSheet(); // Close sheet on success
			} catch (err) {
				console.error("Submission error:", err);
				// You might want to show an error message to the user here
			}
		},
		validators: {
			onSubmit: createRemajaSchema, // Changed from onChange to onSubmit
		},
	});

	return (
		<div>
			<h1>Sheet</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<form.Field
					name="nama"
					children={(field) => (
						<ThemedInput
							htmlFor={field.name}
							type="text"
							name={field.name}
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="John Doe"
							required={true}
						/>
					)}
				/>
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
							placeholder="john"
							required={true}
						/>
					)}
				/>
				<form.Field
					name="jenis_kelamin"
					children={(field) => (
						<ThemedSelect
							name={field.name}
							label="Jenis Kelamin"
							options={jenisKelaminOptions}
							field={field}
							placeholder="Pilih Jenis Kelamin"
							required={true}
						/>
					)}
				/>
				<form.Field
					name="jenjang"
					children={(field) => (
						<ThemedSelect
							name={field.name}
							label="Jenjang"
							options={jenjangOptions}
							field={field}
							placeholder="Pilih Jenjang"
							required={true}
						/>
					)}
				/>
				<form.Field
					name="alamat"
					children={(field) => (
						<ThemedInput
							htmlFor={field.name}
							type="text"
							name={field.name}
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="Jl. Madukoro No. 1"
							required={true}
						/>
					)}
				/>
				<form.Field
					name="sambung"
					children={(field) => (
						<ThemedSelect
							name={field.name}
							label="Sambung"
							options={sambungOptions}
							field={field}
							placeholder="Pilih Sambung"
							required={true}
						/>
					)}
				/>
				<form.Field
					name="role"
					children={(field) => (
						<ThemedSelect
							name={field.name}
							label="Role"
							options={roleOptions}
							field={field}
							placeholder="Pilih Role"
							required={true}
						/>
					)}
				/>
				<form.Field
					name="password"
					children={(field) => (
						<ThemedInput
							htmlFor={field.name}
							type="text"
							name={field.name}
							id={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							placeholder="Make sure it's strong"
							required={true}
						/>
					)}
				/>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
					children={([canSubmit, isSubmitting]) => (
						<ThemedButton type="submit" disabled={!canSubmit}>
							{isSubmitting ? "Memproses..." : "Submit"}
						</ThemedButton>
					)}
				/>
			</form>
			<ThemedButton type="button" onClick={closeSheet}>
				Close
			</ThemedButton>
		</div>
	);
}
