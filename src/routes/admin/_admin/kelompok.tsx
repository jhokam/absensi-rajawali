import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { type ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useDebounce } from "use-debounce";
import Alert from "@/components/Alert";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import type { KelompokBase, KelompokResponseArray } from "@/types/kelompok";

export const Route = createFileRoute("/admin/_admin/kelompok")({
	component: RouteComponent,
});

function RouteComponent() {
	const [cookies] = useCookies(["access_token"]);
	const [searchValue, setSearchValue] = useState("");
	const [debouncedSearch] = useDebounce(searchValue, 1000);

	const columnHelper = createColumnHelper<KelompokBase>();

	const fetchData = async () => {
		const params = new URLSearchParams();
		if (debouncedSearch) {
			params.append("q", debouncedSearch);
		}
		const url = `${import.meta.env.VITE_DEV_LINK}/kelompok?${params.toString()}`;
		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${cookies.access_token}`,
			},
		});
		return response.json();
	};

	const { isPending, error, isError, data } = useQuery<KelompokResponseArray>({
		queryKey: ["kelompokData", debouncedSearch],
		queryFn: fetchData,
	});

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

	return (
		<>
			{isError && (
				<Alert variant="error" className="z-50">
					{error.message}
				</Alert>
			)}
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
