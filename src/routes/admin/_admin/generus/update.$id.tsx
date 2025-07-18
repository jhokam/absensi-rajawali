import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import type { AxiosError, AxiosResponse } from "axios";
import Button from "@/components/Button";
import TextError from "@/components/TextError";
import ThemedInput from "@/components/ThemedInput";
import ThemedLink from "@/components/ThemedLink";
import ThemedSelect from "@/components/ThemedSelect";
import {
	jenisKelaminOptions,
	jenjangOptions,
	kelompokOptions,
	keteranganOptions,
	pendidikanTerakhirOptions,
	sambungOptions,
} from "@/constants/generus";
import type { ErrorBase } from "@/types/api";
import {
	type GenerusRequest,
	type GenerusResponse,
	generusSchema,
} from "@/types/generus";
import { api } from "@/utils/api";
import { useAlert } from "@/utils/useAlert";

export const Route = createFileRoute("/admin/_admin/generus/update/$id")({
	component: RouteComponent,
	loader: async ({ params }): Promise<{ data: GenerusResponse }> =>
		api(`/generus/${params.id}`),
});

function RouteComponent() {
	const loaderData = Route.useLoaderData();
	const dataItems = loaderData.data.data.items;

	const { setAlert } = useAlert();
	const queryClient = useQueryClient();

	const { mutate } = useMutation<
		AxiosResponse<GenerusResponse>,
		AxiosError<ErrorBase>,
		GenerusRequest
	>({
		mutationFn: async (request) => {
			return api.put(`/generus/${dataItems.id}`, request);
		},

		onError: (error) => {
			setAlert(
				error.response?.data.error.message || "Internal Server Error",
				"error",
			);
		},
	});

	const form = useForm({
		defaultValues: {
			nama: dataItems.nama,
			jenis_kelamin: dataItems.jenis_kelamin,
			tempat_lahir: dataItems.tempat_lahir,
			tanggal_lahir: dataItems.tanggal_lahir,
			jenjang: dataItems.jenjang,
			nomer_whatsapp: dataItems.nomer_whatsapp,
			pendidikan_terakhir: dataItems.pendidikan_terakhir,
			nama_orang_tua: dataItems.nama_orang_tua,
			nomer_whatsapp_orang_tua: dataItems.nomer_whatsapp_orang_tua,
			alamat_tempat_tinggal: dataItems.alamat_tempat_tinggal,
			keterangan: dataItems.keterangan,
			alamat_asal: dataItems.alamat_asal,
			sambung: dataItems.sambung,
			kelompok_id: dataItems.kelompok_id,
		},
		onSubmit: ({ value }) => {
			mutate(value, {
				onSuccess: (data) => {
					queryClient.invalidateQueries({ queryKey: ["generusData"] });
					setAlert(data.data.message, "success");
					redirect({ to: "/admin/generus" });
				},
			});
		},
		validators: {
			onSubmit: generusSchema,
		},
	});

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-6 text-gray-800">Update Data</h1>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-4">
				<div className="space-y-4">
					<form.Field name="nama">
						{(field) => (
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
								<TextError field={field} />
							</>
						)}
					</form.Field>

					<form.Field name="jenis_kelamin">
						{(field) => (
							<div className="space-y-1">
								<ThemedSelect
									name={field.name}
									label="Jenis Kelamin"
									options={jenisKelaminOptions}
									placeholder="Pilih Jenis Kelamin"
									required={true}
									value={field.state.value}
									onChange={(e) =>
										field.handleChange(
											e.target.value as typeof field.state.value,
										)
									}
								/>
							</div>
						)}
					</form.Field>

					<form.Field name="tempat_lahir">
						{(field) => (
							<>
								<ThemedInput
									label="Tempat Lahir"
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
								<TextError field={field} />
							</>
						)}
					</form.Field>

					<form.Field name="tanggal_lahir">
						{(field) => (
							<>
								<ThemedInput
									label="Tanggal Lahir"
									htmlFor={field.name}
									type="date"
									name={field.name}
									id={field.name}
									value={
										field.state.value instanceof Date
											? field.state.value.toISOString().split("T")[0]
											: ""
									}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(new Date(e.target.value))}
									placeholder="John Doe"
									required={false}
									className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								/>
								<TextError field={field} />
							</>
						)}
					</form.Field>

					<form.Field name="jenjang">
						{(field) => (
							<div className="space-y-1">
								<ThemedSelect
									name={field.name}
									label="Jenjang"
									options={jenjangOptions}
									placeholder="Pilih Jenjang"
									required={true}
									value={field.state.value}
									onChange={(e) =>
										field.handleChange(
											e.target.value as typeof field.state.value,
										)
									}
								/>
							</div>
						)}
					</form.Field>

					<form.Field name="nomer_whatsapp">
						{(field) => (
							<>
								<ThemedInput
									label="Nomor WhatsApp"
									htmlFor={field.name}
									type="text"
									name={field.name}
									id={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="08123456789"
									required={true}
									className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								/>
								<TextError field={field} />
							</>
						)}
					</form.Field>

					<form.Field name="pendidikan_terakhir">
						{(field) => (
							<div className="space-y-1">
								<ThemedSelect
									name={field.name}
									label="Pendidikan Terakhir"
									options={pendidikanTerakhirOptions}
									placeholder="Pilih Pendidikan Terakhir"
									required={true}
									value={field.state.value}
									onChange={(e) =>
										field.handleChange(
											e.target.value as typeof field.state.value,
										)
									}
								/>
							</div>
						)}
					</form.Field>

					<form.Field name="nama_orang_tua">
						{(field) => (
							<>
								<ThemedInput
									label="Nama Orang Tua"
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
								<TextError field={field} />
							</>
						)}
					</form.Field>

					<form.Field name="nomer_whatsapp_orang_tua">
						{(field) => (
							<>
								<ThemedInput
									label="Nomor WhatsApp Orang Tua"
									htmlFor={field.name}
									type="text"
									name={field.name}
									id={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="08123456789"
									required={true}
									className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
								/>
								<TextError field={field} />
							</>
						)}
					</form.Field>

					<form.Field name="sambung">
						{(field) => (
							<div className="space-y-1">
								<ThemedSelect
									name={field.name}
									label="Sambung"
									options={sambungOptions}
									placeholder="Pilih Sambung"
									required={true}
									value={field.state.value}
									onChange={(e) =>
										field.handleChange(
											e.target.value as typeof field.state.value,
										)
									}
								/>
							</div>
						)}
					</form.Field>

					<form.Field name="alamat_tempat_tinggal">
						{(field) => (
							<>
								<ThemedInput
									label="Alamat Tempat Tinggal"
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
								<TextError field={field} />
							</>
						)}
					</form.Field>

					<form.Field name="keterangan">
						{(field) => (
							<div className="space-y-1">
								<ThemedSelect
									name={field.name}
									label="Keterangan"
									options={keteranganOptions}
									placeholder="Pilih Keterangan"
									required={true}
									value={field.state.value}
									onChange={(e) =>
										field.handleChange(
											e.target.value as typeof field.state.value,
										)
									}
								/>
							</div>
						)}
					</form.Field>

					<form.Field name="alamat_asal">
						{(field) => (
							<>
								<ThemedInput
									label="Alamat Asal"
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
								<TextError field={field} />
							</>
						)}
					</form.Field>

					<form.Field name="kelompok_id">
						{(field) => (
							<div className="space-y-1">
								<ThemedSelect
									name={field.name}
									label="Kelompok"
									options={kelompokOptions}
									placeholder="Pilih Kelompok"
									required={true}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</div>
						)}
					</form.Field>
				</div>

				<div className="flex justify-end space-x-4 mt-6">
					<ThemedLink to="/admin/generus">Close</ThemedLink>
					<form.Subscribe
						selector={(state) => [state.canSubmit, state.isSubmitting]}>
						{([canSubmit, isSubmitting]) => (
							<Button type="submit" disabled={!canSubmit}>
								{isSubmitting ? "Memproses..." : "Submit"}
							</Button>
						)}
					</form.Subscribe>
				</div>
			</form>
		</div>
	);
}
