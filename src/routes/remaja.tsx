import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useCookies } from "react-cookie";
import type { RemajaBase, RemajaResponse } from "../types";

export const Route = createFileRoute("/remaja")({
	component: RouteComponent,
});

const columnHelper = createColumnHelper<RemajaBase>();

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
];

function RouteComponent() {
	const [cookies] = useCookies(["access_token"]);

	const { isPending, error, data } = useQuery<RemajaResponse>({
		queryKey: ["repoData"],
		queryFn: async () =>
			await fetch("http://localhost:8080/api/remaja", {
				headers: {
					Authorization: `Bearer ${cookies.access_token}`,
				},
			}).then(async (res) => await res.json()),
	});

	const table = useReactTable({
		data: data?.data ?? [],
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div>
			Hello "/remaja"!
			<table>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th key={header.id}>
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
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id}>
							{row.getVisibleCells().map((cell) => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
