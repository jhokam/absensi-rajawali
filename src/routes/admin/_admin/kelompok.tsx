import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { type ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Button from "@/components/Button";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import ThemedSelect from "@/components/ThemedSelect";
import type { KelompokBase } from "@/types/kelompok";
import { useKelompok } from "@/utils/fetch/useKelompok";
import { useAlert } from "@/utils/useAlert";

export const Route = createFileRoute("/admin/_admin/kelompok")({
	component: RouteComponent,
});

function RouteComponent() {
	const [searchValue, setSearchValue] = useQueryState("q", {
		defaultValue: "",
		throttleMs: 2000,
	});
	const [debouncedSearch] = useDebounce(searchValue, 2000);
	const { setAlert } = useAlert();
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 9,
	});

	const { isPending, error, isError, data } = useKelompok(
		debouncedSearch,
		pagination,
	);

	const columnHelper = createColumnHelper<KelompokBase>();

	const columns = [
		columnHelper.accessor("id", { header: "ID" }),
		columnHelper.accessor("nama", { header: "Nama" }),
	];

	const table = useReactTable({
		data: data?.data.items || [],
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		rowCount: data?.data.meta.total,
		onPaginationChange: setPagination,
		state: {
			pagination,
		},
		manualFiltering: true,
		getFilteredRowModel: getFilteredRowModel(),
	});

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	useEffect(() => {
		if (isError) {
			setAlert(
				error.response?.data.message || "Internal Server Error",
				"error",
			);
		}
	}, [isError, error]);

	return (
		<>
			<div className="flex justify-between">
				<SearchBar
					onChange={handleChange}
					placeholder="Search by Name"
					value={searchValue}
				/>
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
				<tfoot>
					<tr>
						<td>
							<Button
								type="button"
								onClick={() => table.previousPage()}
								disabled={!table.getCanPreviousPage()}>
								Previous
							</Button>
							<Button
								type="button"
								onClick={() => table.nextPage()}
								disabled={!table.getCanNextPage()}>
								Next
							</Button>
							<ThemedSelect
								name="pageSize"
								options={[
									{ value: 9, label: "9" },
									{ value: 19, label: "19" },
									{ value: 20, label: "20" },
									{ value: 30, label: "30" },
								]}
								placeholder="Select Page Size"
								value={table.getState().pagination.pageSize}
								onChange={(e) => table.setPageSize(Number(e.target.value))}
							/>
							<p>Total Page: {table.getPageCount()}</p>
							<p>Total Row: {table.getRowCount()}</p>
						</td>
					</tr>
				</tfoot>
			</table>
		</>
	);
}
