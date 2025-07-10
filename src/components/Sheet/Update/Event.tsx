import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import TextError from "@/components/TextError";
import ThemedInput from "@/components/ThemedInput";
import {
	type EventBase,
	type EventRequest,
	type EventResponse,
	eventSchema,
} from "@/types/event";
import { api } from "@/utils/api";
import { useAlert } from "@/utils/useAlert";

export default function SheetUpdateEvent({
	closeSheet,
	selectedData,
}: {
	closeSheet: () => void;
	selectedData: EventBase;
}) {
	const { setAlert } = useAlert();

	const { mutateAsync } = useMutation<EventResponse, Error, EventRequest>({
		mutationFn: async (data: EventRequest) => {
			return api(`/event/${selectedData.id}`, {
				method: "PUT",
				body: JSON.stringify(data),
			});
		},
		onError: (error) => {
			setAlert(error.message, "error");
		},
	});

	const form = useForm({
		defaultValues: {
			title: selectedData.title,
			start_date: selectedData.start_date,
			end_date: selectedData.end_date,
			description: selectedData.description,
			latitude: selectedData.latitude,
			longitude: selectedData.longitude,
		},
		onSubmit: async ({ value }) => {
			await mutateAsync(value);
			closeSheet();
		},
		validators: {
			onSubmit: eventSchema,
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
						<form.Field name="title">
							{(field) => (
								<>
									<ThemedInput
										label="Title"
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

						<form.Field name="start_date">
							{(field) => (
								<>
									<ThemedInput
										label="Start Date"
										variant="secondary"
										htmlFor={field.name}
										type="date"
										name={field.name}
										id={field.name}
										value={field.state.value.toString()}
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
						</form.Field>

						<form.Field name="end_date">
							{(field) => (
								<>
									<ThemedInput
										label="End Date"
										variant="secondary"
										htmlFor={field.name}
										type="date"
										name={field.name}
										id={field.name}
										value={field.state.value.toString()}
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
						</form.Field>
						<form.Field name="latitude">
							{(field) => (
								<>
									<ThemedInput
										label="Latitude"
										variant="secondary"
										htmlFor={field.name}
										type="number"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(Number(e.target.value))}
										placeholder="John Doe"
										required={true}
										className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									<TextError field={field} />
								</>
							)}
						</form.Field>

						<form.Field name="longitude">
							{(field) => (
								<>
									<ThemedInput
										label="Longitude"
										variant="secondary"
										htmlFor={field.name}
										type="number"
										name={field.name}
										id={field.name}
										value={field.state.value}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(Number(e.target.value))}
										placeholder="John Doe"
										required={true}
										className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									<TextError field={field} />
								</>
							)}
						</form.Field>

						<form.Field name="description">
							{(field) => (
								<>
									<ThemedInput
										label="Description"
										variant="secondary"
										htmlFor={field.name}
										type="text"
										name={field.name}
										id={field.name}
										value={field.state.value || ""}
										onBlur={field.handleBlur}
										onChange={(e) => field.handleChange(e.target.value)}
										placeholder="John Doe"
										required={false}
										className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
									/>
									<TextError field={field} />
								</>
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
