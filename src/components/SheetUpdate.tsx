import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import {
	jenisKelaminOptions,
	jenjangOptions,
	kelompokOptions,
	keteranganOptions,
	pendidikanTerakhirOptions,
	sambungOptions,
} from "@/constants";
import {
	type GenerusBase,
	type GenerusRequest,
	type GenerusResponse,
	generusSchema,
} from "@/types/generus";
import { api } from "../utils/api";
import TextError from "./TextError";
import ThemedInput from "./ThemedInput";
import ThemedSelect from "./ThemedSelect";

export default function SheetUpdate({
	closeSheet,
	selectedData,
}: {
	closeSheet: () => void;
	selectedData: GenerusBase;
}) {
	const { mutateAsync, isError, error } = useMutation<
		GenerusResponse,
		Error,
		GenerusRequest
	>({
		mutationFn: async (data: GenerusRequest) => {
			return api(`/generus/${selectedData.id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
		},
	});

	const form = useForm({
		defaultValues: {
			nama: selectedData.nama,
			jenis_kelamin: selectedData.jenis_kelamin,
			tempat_lahir: selectedData.tempat_lahir,
			tanggal_lahir: selectedData.tanggal_lahir,
			jenjang: selectedData.jenjang,
			nomer_whatsapp: selectedData.nomer_whatsapp,
			pendidikan_terakhir: selectedData.pendidikan_terakhir,
			nama_orang_tua: selectedData.nama_orang_tua,
			nomer_whatsapp_orang_tua: selectedData.nomer_whatsapp_orang_tua,
			alamat_tempat_tinggal: selectedData.alamat_tempat_tinggal,
			keterangan: selectedData.keterangan,
			alamat_asal: selectedData.alamat_asal,
			sambung: selectedData.sambung,
			kelompok_id: selectedData.kelompok_id,
		},
		onSubmit: async ({ value }) => {
			await mutateAsync(value);
			closeSheet();
		},
		validators: {
			onSubmit: generusSchema,
		},
	});

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
				<h1 className="text-2xl font-bold mb-6 text-gray-800">Update Data</h1>

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
									<TextError field={field} />
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
							name="tempat_lahir"
							children={(field) => (
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
						/>

						<form.Field
							name="tanggal_lahir"
							children={(field) => (
								<>
									<ThemedInput
										label="Tanggal Lahir"
										htmlFor={field.name}
										type="date"
										name={field.name}
										id={field.name}
										value={String(field.state.value)}
										onBlur={field.handleBlur}
										onChange={(e) =>
											field.handleChange(new Date(e.target.value))
										}
										placeholder="John Doe"
										required={true}
										className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									<TextError field={field} />
								</>
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
							name="nomer_whatsapp"
							children={(field) => (
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
						/>

						<form.Field
							name="pendidikan_terakhir"
							children={(field) => (
								<div className="space-y-1">
									<ThemedSelect
										name={field.name}
										label="Pendidikan Terakhir"
										options={pendidikanTerakhirOptions}
										field={field}
										placeholder="Pilih Pendidikan Terakhir"
										required={true}
									/>
								</div>
							)}
						/>

						<form.Field
							name="nama_orang_tua"
							children={(field) => (
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
						/>

						<form.Field
							name="nomer_whatsapp_orang_tua"
							children={(field) => (
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
							name="alamat_tempat_tinggal"
							children={(field) => (
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
						/>

						<form.Field
							name="keterangan"
							children={(field) => (
								<div className="space-y-1">
									<ThemedSelect
										name={field.name}
										label="Keterangan"
										options={keteranganOptions}
										field={field}
										placeholder="Pilih Keterangan"
										required={true}
									/>
								</div>
							)}
						/>

						<form.Field
							name="alamat_asal"
							children={(field) => (
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
						/>

						<form.Field
							name="kelompok_id"
							children={(field) => (
								<div className="space-y-1">
									<ThemedSelect
										name={field.name}
										label="Kelompok"
										options={kelompokOptions}
										field={field}
										placeholder="Pilih Kelompok"
										required={true}
									/>
								</div>
							)}
						/>
					</div>

					<div className="flex justify-end space-x-4 mt-6">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<button
									type="submit"
									disabled={!canSubmit}
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
								>
									{isSubmitting ? "Memproses..." : "Update"}
								</button>
							)}
						/>

						<button
							type="button"
							onClick={closeSheet}
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
						>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
