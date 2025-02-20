import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useDebounce } from "use-debounce";
import Alert from "../../../components/Alert";
import Badge from "../../../components/Badge";
import Dialog from "../../../components/Dialog";
import SearchBar from "../../../components/SearchBar";
import SheetCreate from "../../../components/SheetCreate";
import Sidebar from "../../../components/Sidebar";
import Spinner from "../../../components/Spinner";
import ThemedButton from "../../../components/ThemedButton";
import { colorMap } from "../../../constants";
import type { RemajaBase, RemajaResponse } from "../../../types/api";
import { useProfile } from "../../../utils/useProfile";

export const Route = createFileRoute("/admin/dashboard/remaja")({
	component: RouteComponent,
});

function RouteComponent() {
	const [cookies] = useCookies(["access_token"]);
	const [sheet, setSheet] = useState(false);
	const [alert, setAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<"success" | "error">("success");
	const queryClient = useQueryClient();
	const [dialog, setDialog] = useState(false);
	const { role } = useProfile();
	const [searchTerm, setSearchTerm] = useState("");
	const [debounceSearch] = useDebounce(searchTerm, 3000);

	const deleteRemaja = async (id: number) => {
		const response = await fetch(`http://localhost:8080/api/remaja/${id}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${cookies.access_token}`,
			},
		});

		return response.json();
	};

	const mutation = useMutation({
		mutationFn: (id: number) => deleteRemaja(id),
		onSuccess: (success) => {
			queryClient.invalidateQueries({ queryKey: ["remajaData"] });
			handleAlertSuccess(success.message);
		},
		onError: (error) => {
			handleAlertError(error.message);
		},
	});

	const columnHelper = createColumnHelper<RemajaBase>();

	const handleEdit = (row: RemajaBase) => {};

	const handleDelete = (row: RemajaBase) => {
		mutation.mutate(row.id);
	};

	const { isPending, error, data } = useQuery<RemajaResponse>({
		queryKey: ["remajaData", debounceSearch],
		queryFn: async () => {
			const searchParams = new URLSearchParams();
			if (debounceSearch) {
				searchParams.append("id", debounceSearch);
			}

			const url = `http://localhost:8080/api/remaja${
				searchParams.toString() ? `?${searchParams.toString()}` : ""
			}`;

			const response = await fetch(url, {
				headers: {
					Authorization: `Bearer ${cookies.access_token}`,
				},
			});

			if (!response.ok) {
				throw new Error("Failed to fetch data");
			}

			return response.json();
		},
	});

	const columns = [
		columnHelper.accessor("id", {
			header: () => "ID",
		}),
		columnHelper.accessor("nama", {
			header: () => "Nama",
		}),
		columnHelper.accessor("username", {
			header: () => "Username",
		}),
		columnHelper.accessor("jenis_kelamin", {
			header: () => "Jenis Kelamin",
		}),
		columnHelper.accessor("jenjang", {
			header: () => "Jenjang",
		}),
		columnHelper.accessor("alamat", {
			header: () => "Alamat",
		}),
		columnHelper.accessor("sambung", {
			header: () => "Sambung",
		}),
		columnHelper.accessor("role", {
			header: () => "Role",
		}),
		columnHelper.display({
			id: "actions",
			header: () => "Action",
			cell: (props) => {
				const row = props.row.original;
				return (
					<div className="flex space-x-2">
						<button
							type="button"
							onClick={() => {
								handleEdit(row);
							}}
							disabled={mutation.isPending}
						>
							<Icon
								icon="line-md:edit"
								fontSize={20}
								className={
									mutation.isPending ? "text-gray-500" : "text-blue-500"
								}
							/>
						</button>
						<button
							type="button"
							onClick={() => {
								handleDelete(row);
							}}
							disabled={mutation.isPending}
						>
							<Icon
								icon="mynaui:trash"
								fontSize={20}
								className={
									mutation.isPending ? "text-gray-500" : "text-red-500"
								}
							/>
						</button>
					</div>
				);
			},
			enableHiding: true,
			meta: {
				hidden: role === "User",
			},
		}),
	];

	const table = useReactTable({
		data: data?.data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnVisibility: {
				actions: role !== "User",
			},
		},
	});

	const handleAlertError = (message: string) => {
		setAlertMessage(message);
		setAlertType("error");
		setAlert(true);
		setTimeout(() => {
			setAlert(false);
		}, 3000);
	};

	const handleAlertSuccess = (message: string) => {
		setAlertMessage(message);
		setAlertType("success");
		setAlert(true);
		setTimeout(() => {
			setAlert(false);
		}, 3000);
	};

	return (
		<div className="flex">
			{sheet ? <SheetCreate closeSheet={() => setSheet(false)} /> : null}
			{alert ? <Alert message={alertMessage} type={alertType} /> : null}
			{dialog ? (
				<Dialog
					cancel="Cancel"
					confirm="Yes, Delete!"
					description="Are you sure want to delete this data?"
					title="Delete Data"
					handleCancel={() => setDialog(false)}
					handleConfirm={() => {}}
				/>
			) : null}
			<Sidebar />
			<div className="flex-1 px-2 py-3">
				<div className="flex justify-between">
					<SearchBar
						onChange={(e) => {
							setSearchTerm(e.target.value);
						}}
						placeholder=""
						value={searchTerm}
					/>
					<ThemedButton type="button" onClick={() => setSheet(true)}>
						Create Remaja
					</ThemedButton>
				</div>
				<table className="w-full h-fit text-left text-sm text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50">
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<th key={header.id} className="px-6 py-3">
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</th>
								))}
							</tr>
						))}
					</thead>
					{isPending ? (
						<Spinner className="m-2" />
					) : (
						<tbody>
							{table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="bg-white border-b">
									{row.getVisibleCells().map((cell) => {
										const value = flexRender(
											cell.column.columnDef.cell,
											cell.getContext(),
										);
										const fieldName = cell.column.id;
										if (
											["jenis_kelamin", "jenjang", "role", "sambung"].includes(
												fieldName,
											)
										) {
											const badgeColor =
												colorMap[fieldName][cell.row.original[fieldName]];

											if (
												fieldName in colorMap &&
												cell.row.original[fieldName] in colorMap[fieldName]
											) {
												badgeColor;
											}

											return (
												<td
													key={cell.id}
													className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
												>
													<Badge text={value} color={badgeColor} size="small" />
												</td>
											);
										}
										return (
											<td
												key={cell.id}
												className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
											>
												{value}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>
		</div>
	);
}
