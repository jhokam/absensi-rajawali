import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { type ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import type { LogBase, LogResponseArray } from "@/types/log";
import { api } from "@/utils/api";
import { useAlert } from "@/utils/useAlert";

export const Route = createFileRoute("/admin/_admin/log")({
	component: RouteComponent,
});

function RouteComponent() {
	const [searchValue, setSearchValue] = useState("");
	const [debouncedSearch] = useDebounce(searchValue, 1000);
	const { setAlert } = useAlert();

	const columnHelper = createColumnHelper<LogBase>();

	const { isPending, error, isError, data } = useQuery<LogResponseArray>({
		queryKey: ["logData", debouncedSearch],
		queryFn: () => api("/log"),
	});

	const columns = [
		columnHelper.accessor("id", { header: "ID" }),
		columnHelper.accessor("event", { header: "Event" }),
		columnHelper.accessor("description", { header: "Description" }),
		columnHelper.accessor("user_id", { header: "User ID" }),
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
