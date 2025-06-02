import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import type {
	GenerusResponsesese,
	GenerusResponseArrayArrayArray,
	PublicGenerus,
} from "@/types/api";
import { useProfile } from "@/utils/useProfile";
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

export const Route = createFileRoute("/admin/dashboard/remaja")({
	component: RouteComponent,
});

function RouteComponent() {
	const [cookies] = useCookies(["access_token"]);
	const [sheetCreate, setSheetCreate] = useState(false);
	const [sheetUpdate, setSheetUpdate] = useState(false);
	const [selectedData, setSelectedData] = useState<PublicGenerus | null>(null);
	const [alert, setAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [alertType, setAlertType] = useState<"success" | "error">("success");
	const [dialog, setDialog] = useState(false);
	const [deleteId, setDeleteId] = useState<number | null>(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [debounceSearch] = useDebounce(searchTerm, 1000);
	const queryClient = useQueryClient();
	const { role } = useProfile();

	const deleteGenerus = async (id: number) => {
		const response = await fetch(
			`${import.meta.env.VITE_DEV_LINK}/generus/${id}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${cookies.access_token}`,
				},
			},
		);
		if (!response.ok) {
			throw new Error("Failed to delete data");
		}
		return response.json();
	};

	const mutation = useMutation({
		mutationFn: deleteGenerus,
		onSuccess: (success: GenerusResponse) => {
			console.log(success);

			queryClient.invalidateQueries({ queryKey: ["generusData"] });
			handleAlertSuccess(success.message);
		},
		onError: (error) => {
			handleAlertError(error.message);
		},
	});

	const columnHelper = createColumnHelper<PublicGenerus>();

	const handleEdit = (row: PublicGenerus) => {
		setSelectedData(row);
		setSheetUpdate(true);
	};

	const handleDeleteConfirm = () => {
		if (deleteId !== null) {
			mutation.mutate(deleteId);
			setDialog(false);
			setDeleteId(null);
		}
	};

	const handleDelete = (row: PublicGenerus) => {
		setDeleteId(row.id);
		setDialog(true);
	};

	const { isPending, error, isError, data } = useQuery<GenerusResponseArray>({
		queryKey: ["generusData", debounceSearch],
		queryFn: async () => {
			const searchParams = new URLSearchParams();
			if (debounceSearch && !Number.isNaN(Number(debounceSearch))) {
				searchParams.append("id", debounceSearch);
			}

			const url = `${import.meta.env.VITE_DEV_LINK}/generus${
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
		columnHelper.accessor("id", { header: "ID" }),
		columnHelper.accessor("nama", { header: "Nama" }),
		columnHelper.accessor("username", { header: "Username" }),
		columnHelper.accessor("jenis_kelamin", { header: "Jenis Kelamin" }),
		columnHelper.accessor("jenjang", { header: "Jenjang" }),
		columnHelper.accessor("alamat", { header: "Alamat" }),
		columnHelper.accessor("sambung", { header: "Sambung" }),
		columnHelper.accessor("role", { header: "Role" }),
		columnHelper.display({
			id: "actions",
			header: "Action",
			cell: (props) => {
				const row = props.row.original;
				return (
					<div className="flex space-x-2">
						<button type="button" onClick={() => handleEdit(row)}>
							<Icon
								icon="line-md:edit"
								fontSize={20}
								className="text-blue-500"
							/>
						</button>
						<button type="button" onClick={() => handleDelete(row)}>
							<Icon
								icon="mynaui:trash"
								fontSize={20}
								className="text-red-500"
							/>
						</button>
					</div>
				);
			},
			enableHiding: true,
			meta: { hidden: role === "User" },
		}),
	];

	const table = useReactTable({
		data: data?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		state: {
			columnVisibility: { actions: role !== "User" },
		},
	});

	const handleAlertError = (message: string) => {
		setAlertMessage(message);
		setAlertType("error");
		setAlert(true);
		setTimeout(() => setAlert(false), 3000);
	};

	const handleAlertSuccess = (message: string) => {
		setAlertMessage(message);
		setAlertType("success");
		setAlert(true);
		setTimeout(() => setAlert(false), 3000);
	};

	return (
		<>
			<div className="flex justify-between">
				<SearchBar
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search by ID"
					value={searchTerm}
				/>
				<Button typeof="button" onClick={() => setSheetCreate(true)}>
					Create Generus
				</Button>
			</div>
			<table className="w-full text-left text-sm text-gray-500">
				<thead className="text-xs text-gray-700 uppercase bg-gray-50">
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id} className="px-6 py-3">
									{flexRender(
										header.column.columnDef.header,
										header.getContext(),
									)}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="bg-white border-b">
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id} className="px-6 py-4">
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}
