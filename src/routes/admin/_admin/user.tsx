import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import type { AxiosError, AxiosResponse } from "axios";
import { useQueryState } from "nuqs";
import { type ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import SearchBar from "@/components/SearchBar";
import SheetCreateUser from "@/components/Sheet/Create/User";
import SheetUpdateUser from "@/components/Sheet/Update/User";
import Skeleton from "@/components/Skeleton";
import type { ErrorBase } from "@/types/api";
import type { UserBase, UserResponse } from "@/types/user";
import { api } from "@/utils/api";
import { useUser } from "@/utils/fetch/useUser";
import { useAlert } from "@/utils/useAlert";

export const Route = createFileRoute("/admin/_admin/user")({
	component: RouteComponent,
});

function RouteComponent() {
	const [sheetCreate, setSheetCreate] = useState(false);
	const [sheetUpdate, setSheetUpdate] = useState(false);
	const [selectedData, setSelectedData] = useState<UserBase | null>(null);
	const [dialog, setDialog] = useState(false);
	const [deleteId, setDeleteId] = useState("");
	const queryClient = useQueryClient();
	const [searchValue, setSearchValue] = useQueryState("q", {
		defaultValue: "",
		throttleMs: 2000,
	});
	const [debouncedSearch] = useDebounce(searchValue, 2000);
	const { setAlert } = useAlert();

	const mutation = useMutation<
		AxiosResponse<UserResponse>,
		AxiosError<ErrorBase>,
		string
	>({
		mutationFn: (id: string) => api.delete(`/users/${id}`),
		onError: (error) => {
			setAlert(
				error.response?.data.error.message || "Internal Server Error",
				"error",
			);
		},
	});

	const columnHelper = createColumnHelper<UserBase>();

	const handleEdit = (row: UserBase) => {
		setSelectedData(row);
		setSheetUpdate(true);
	};

	const handleDeleteConfirm = () => {
		mutation.mutate(deleteId, {
			onSuccess: (data) => {
				queryClient.invalidateQueries({ queryKey: ["userData"] });
				setAlert(data.data.message, "success");
			},
		});
		setDialog(false);
		setDeleteId("");
	};

	const handleDelete = (row: UserBase) => {
		setDeleteId(row.id);
		setDialog(true);
	};

	const { data, isPending, error, isError } = useUser(debouncedSearch);

	const columns = [
		columnHelper.accessor("id", { header: "ID" }),
		columnHelper.accessor("username", { header: "Username" }),
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
		}),
	];

	const table = useReactTable({
		data: data?.data || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
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
			{sheetCreate && (
				<SheetCreateUser closeSheet={() => setSheetCreate(false)} />
			)}
			{sheetUpdate && selectedData && (
				<SheetUpdateUser
					closeSheet={() => setSheetUpdate(false)}
					selectedData={selectedData}
				/>
			)}
			<div className="flex justify-between">
				<SearchBar
					onChange={handleChange}
					placeholder="Search by Name"
					value={searchValue}
				/>
				<Button typeof="button" onClick={() => setSheetCreate(true)}>
					Create User
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
						? Skeleton(table)
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
