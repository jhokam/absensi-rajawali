import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { type ChangeEvent, useEffect } from "react";
import { useDebounce } from "use-debounce";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import type { DesaBase } from "@/types/desa";
import { useDesa } from "@/utils/fetch/useDesa";
import { useAlert } from "@/utils/useAlert";

export const Route = createFileRoute("/admin/_admin/desa")({
	component: RouteComponent,
});

function RouteComponent() {
	const [searchValue, setSearchValue] = useQueryState("q", {
		defaultValue: "",
		throttleMs: 2000,
	});
	const [debouncedSearch] = useDebounce(searchValue, 2000);
	const { setAlert } = useAlert();

	const columnHelper = createColumnHelper<DesaBase>();

	const params = new URLSearchParams({ q: debouncedSearch });

	const { isPending, error, isError, data } = useDesa(params, debouncedSearch);

	const columns = [
		columnHelper.accessor("id", { header: "ID" }),
		columnHelper.accessor("nama", { header: "Nama" }),
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
			</table>
		</>
	);
}
