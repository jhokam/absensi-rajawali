import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	createFileRoute,
	redirect,
	useRouterState,
} from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { ChangeEvent, useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useDebounce } from "use-debounce";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import type {
	GenerusBase,
	GenerusResponse,
	GenerusResponseArray,
} from "@/types/generus";
import { useAlert } from "@/utils/useAlert";
import { useProfile } from "@/utils/useProfile";

export const Route = createFileRoute("/admin/_admin/generus")({
	// validateSearch: generusFilterSchema,

	component: RouteComponent,
	beforeLoad: async () => {
		const cookie = new Cookies();
		if (!cookie.get("access_token")) {
			throw redirect({
				to: "/admin/login",
			});
		}
	},
});

function RouteComponent() {
	const [cookies] = useCookies(["access_token"]);
	const [sheetCreate, setSheetCreate] = useState(false);
	const [sheetUpdate, setSheetUpdate] = useState(false);
	const [selectedData, setSelectedData] = useState<GenerusBase | null>(null);
	const [dialog, setDialog] = useState(false);
	const [deleteId, setDeleteId] = useState<string>("");
	const queryClient = useQueryClient();
	const { role } = useProfile();
	const [searchValue, setSearchValue] = useState("");
	const [debouncedSearch] = useDebounce(searchValue, 1000);
	const { setAlert } = useAlert();

	const deleteGenerus = async (id: string) => {
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
			const errorData: GenerusResponse = await response
				.json()
				.catch(() => ({}));
			const errorMessage =
				errorData.error?.message || `HTTP error! status: ${response.status}`;
			throw new Error(errorMessage);
		}
		return response.json();
	};

	const mutation = useMutation({
		mutationFn: deleteGenerus,
		onSuccess: (success: GenerusResponse) => {
			queryClient.invalidateQueries({ queryKey: ["generusData"] });
			setAlert(success.message, "success");
		},
		onError: (error) => {
			setAlert(error.message, "error");
		},
	});

	const columnHelper = createColumnHelper<GenerusBase>();

	const handleEdit = (row: GenerusBase) => {
		setSelectedData(row);
		setSheetUpdate(true);
	};

	const handleDeleteConfirm = () => {
		mutation.mutate(deleteId);
		console.log(mutation.isSuccess);
		setDialog(false);
		setDeleteId("");
	};

	const handleDelete = (row: GenerusBase) => {
		setDeleteId(row.id);
		setDialog(true);
	};

	const fetchData: () => Promise<GenerusResponseArray> = async () => {
		const response = await fetch(
			`${import.meta.env.VITE_DEV_LINK}/generus?${new URLSearchParams({
				q: debouncedSearch,
			}).toString()}`,
			{
				headers: {
					Authorization: `Bearer ${cookies.access_token}`,
				},
			},
		);

		if (!response.ok) {
			const errorData: GenerusResponseArray = await response
				.json()
				.catch(() => ({}));
			const errorMessage =
				errorData.error?.message || `HTTP error! status: ${response.status}`;
			throw new Error(errorMessage);
		}

		return response.json();
	};

	const { isPending, error, isError, data } = useQuery({
		queryKey: ["generusData", debouncedSearch],
		queryFn: fetchData,
	});

	const columns = [
		columnHelper.accessor("id", { header: "ID" }),
		columnHelper.accessor("nama", { header: "Nama" }),
		columnHelper.accessor("jenis_kelamin", { header: "Jenis Kelamin" }),
		columnHelper.accessor("jenjang", { header: "Jenjang" }),
		columnHelper.accessor("alamat_tempat_tinggal", {
			header: "Alamat Tempat Tinggal",
		}),
		columnHelper.accessor("sambung", { header: "Sambung" }),
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

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		if (isError) {
			setAlert(error.message, "error");
		}
	}, [isError, error]);

	return (
		<>
			{dialog && (
				<Dialog
					cancel="Cancel"
					confirm="Delete"
					title="Are you sure you want to delete this data?"
					handleCancel={() => setDialog(false)}
					handleConfirm={handleDeleteConfirm}
					description="This action cannot be undone."
				/>
			)}
			<div className="flex justify-between">
				<SearchBar
					onChange={handleChange}
					placeholder="Search by Name"
					value={searchValue}
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
					{isPending
						? Skeleton(table, {})
						: table.getRowModel().rows.map((row) => (
								<tr key={row.id} className="bg-white border-b">
									{row.getVisibleCells().map((cell) => (
										<td key={cell.id} className="px-6 py-4">
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</td>
									))}
								</tr>
							))}
				</tbody>
			</table>
		</>
	);
}
