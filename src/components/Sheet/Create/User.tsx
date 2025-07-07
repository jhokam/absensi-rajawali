import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import Button from "@/components/Button";
import TextError from "@/components/TextError";
import ThemedInput from "@/components/ThemedInput";
import ThemedSelect from "@/components/ThemedSelect";
import { roleOptions } from "@/constants";
import {
	defaultValueUser,
	type UserRequest,
	type UserResponse,
	userSchema,
} from "@/types/user";
import { api } from "@/utils/api";
import { useAlert } from "@/utils/useAlert";

export default function SheetCreateUser({
	closeSheet,
}: {
	closeSheet: () => void;
}) {
	const { setAlert } = useAlert();

	const { mutateAsync } = useMutation<UserResponse, Error, UserRequest>({
		mutationFn: async (data: UserRequest) => {
			return api("/user", {
				method: "POST",
				body: JSON.stringify(data),
			});
		},
		onSuccess: (data) => {
			closeSheet();
		},
		onError: (error) => {
			setAlert(error.message, "error");
		},
	});

	const form = useForm({
		defaultValues: defaultValueUser,
		onSubmit: async ({ value }) => {
			await mutateAsync(value as UserRequest);
			closeSheet();
		},
		validators: {
			onSubmit: userSchema,
		},
	});

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
			<div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
				<h1 className="text-2xl font-bold mb-6 text-gray-800">
					Buat Data User
				</h1>

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

						<form.Field name="role">
							{(field) => (
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
						</form.Field>
					</div>

					<div className="flex justify-end space-x-4 mt-6">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}>
							{([canSubmit, isSubmitting]) => (
								<Button type="submit" disabled={!canSubmit}>
									{isSubmitting ? "Memproses..." : "Submit"}
								</Button>
							)}
						</form.Subscribe>
						<Button
							type="button"
							onClick={closeSheet}
							className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all">
							Close
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
