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
import Alert from "../../../components/Alert";
import Badge from "../../../components/Badge";
import SearchBar from "../../../components/SearchBar";
import SheetCreate from "../../../components/SheetCreate";
import SheetUpdate from "../../../components/SheetUpdate";
import Sidebar from "../../../components/Sidebar";
import Skeleton from "../../../components/Skeleton";
import Spinner from "../../../components/Spinner";
import ThemedButton from "../../../components/ThemedButton";
import type { RemajaBase, RemajaResponse } from "../../../types/api";

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
		queryKey: ["remajaData"],
		queryFn: async () =>
			await fetch("http://localhost:8080/api/remaja", {
				headers: {
					Authorization: `Bearer ${cookies.access_token}`,
				},
			})
				.then(async (res) => await res.json())
				.catch((err) => {
					if (err instanceof Error) {
						throw err;
					}
				}),
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
							className="text-blue-500"
							onClick={() => {
								handleEdit(row);
							}}
						>
							Edit
						</button>
						<button
							type="button"
							className="text-red-500"
							onClick={() => {
								handleDelete(row);
							}}
							disabled={mutation.isPending}
						>
							{mutation.isPending ? "Deleting..." : "Delete"}
						</button>
					</div>
				);
			},
		}),
	];

	const table = useReactTable({
		data: data?.data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	const colorMap = {
		jenis_kelamin: {
			Laki_Laki: "blue",
			Perempuan: "pink",
		},
		jenjang: {
			Paud: "green",
			Caberawit: "yellow",
			Pra_Remaja: "orange",
			Remaja: "purple",
			Pra_Nikah: "teal",
		},
		role: {
			Admin: "red",
			User: "gray",
		},
		sambung: {
			Aktif: "green",
			Tidak_Aktif: "red",
		},
	};

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
			{sheet ? <SheetUpdate closeSheet={() => setSheet(false)} /> : null}
			{alert ? <Alert message={alertMessage} type={alertType} /> : null}
			<Sidebar />
			<div>
				{/* <SearchBar onChange={() => {}}  /> */}
				<ThemedButton type="button" onClick={() => setSheet(true)}>
					Create Remaja
				</ThemedButton>
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
