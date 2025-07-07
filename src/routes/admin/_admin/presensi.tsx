import { useQuery } from "@tanstack/react-query";
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
import type { PresenceBase, PresenceResponseArray } from "@/types/presence";
import { api } from "@/utils/api";
import { useAlert } from "@/utils/useAlert";

export const Route = createFileRoute("/admin/_admin/presensi")({
	component: RouteComponent,
});

function RouteComponent() {
	const [searchValue, setSearchValue] = useQueryState("q", {
		defaultValue: "",
		throttleMs: 2000,
	});
	const [debouncedSearch] = useDebounce(searchValue, 2000);
	const { setAlert } = useAlert();
	const params = new URLSearchParams({ q: debouncedSearch });

	const columnHelper = createColumnHelper<PresenceBase>();

	const { isPending, error, isError, data } = useQuery<PresenceResponseArray>({
		queryKey: ["presenceData", debouncedSearch],
		queryFn: () => api(`/presence?${params.toString()}`),
	});

	const columns = [
		columnHelper.accessor("id", { header: "ID" }),
		columnHelper.accessor("event_id", { header: "Event ID" }),
		columnHelper.accessor("generus_id", { header: "Generus ID" }),
		columnHelper.accessor("status", { header: "Status" }),
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
