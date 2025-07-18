import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError, AxiosResponse } from "axios";
import TextError from "@/components/TextError";
import ThemedInput from "@/components/ThemedInput";
import ThemedSelect from "@/components/ThemedSelect";
import { roleOptions } from "@/constants";
import type { ErrorBase } from "@/types/api";
import {
	type UserBase,
	type UserRequest,
	type UserResponse,
	userSchema,
} from "@/types/user";
import { api } from "@/utils/api";
import { useAlert } from "@/utils/useAlert";

export default function SheetUpdateUser({
	closeSheet,
	selectedData,
}: {
	closeSheet: () => void;
	selectedData: UserBase;
}) {
	const { setAlert } = useAlert();
	const queryClient = useQueryClient();

	const { mutate } = useMutation<
		AxiosResponse<UserResponse>,
		AxiosError<ErrorBase>,
		UserRequest
	>({
		mutationFn: async (data: UserRequest) => {
			return api.put(`/user/${selectedData.id}`, data);
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
			username: selectedData.username,
			password: "",
			role: selectedData.role,
		},
		onSubmit: ({ value }) => {
			mutate(value, {
				onSuccess: (data) => {
					queryClient.invalidateQueries({ queryKey: ["userData"] });
					setAlert(data.data.message, "success");
					closeSheet();
				},
			});
			closeSheet();
		},
		validators: {
			onSubmit: userSchema,
		},
	});

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
				<h1 className="text-2xl font-bold mb-6 text-gray-800">Update User</h1>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
					className="space-y-4">
					<div className="space-y-4">
						<form.Field name="username">
							{(field) => (
								<>
									<ThemedInput
										label="Username"
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

						<form.Field name="password">
							{(field) => (
								<>
									<ThemedInput
										label="Password"
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

						<form.Field name="role">
							{(field) => (
								<div className="space-y-1">
									<ThemedSelect
										name={field.name}
										label="Role"
										options={roleOptions}
										placeholder="Pilih Role"
										value={field.state.value}
										onChange={(e) =>
											field.handleChange(
												e.target.value as typeof field.state.value,
											)
										}
										required={true}
									/>
								</div>
							)}
						</form.Field>
					</div>

					<div className="flex justify-end space-x-4 mt-6">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}>
							{([canSubmit, isSubmitting]) => (
								<button
									type="submit"
									disabled={!canSubmit}
									className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
									{isSubmitting ? "Memproses..." : "Update"}
								</button>
							)}
						</form.Subscribe>

						<button
							type="button"
							onClick={closeSheet}
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
