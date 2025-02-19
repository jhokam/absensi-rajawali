import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Badge from "../../../components/Badge";
import SearchBar from "../../../components/SearchBar";
import Sheet from "../../../components/Sheet";
import Sidebar from "../../../components/Sidebar";
import ThemedButton from "../../../components/ThemedButton";
import type { RemajaBase, RemajaResponse } from "../../../types/api";

export const Route = createFileRoute("/admin/dashboard/remaja")({
	component: RouteComponent,
});

const columnHelper = createColumnHelper<RemajaBase>();

const handleEdit = (row: RemajaBase) => {
	console.log(row);
};

const handleDelete = (row: RemajaBase) => {
	console.log(row);
};

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
					>
						Delete
					</button>
				</div>
			);
		},
	}),
];

function RouteComponent() {
	const [cookies] = useCookies(["access_token"]);
	const [sheet, setSheet] = useState(false);

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

	return (
		<div className="flex">
			{sheet ? <Sheet closeSheet={() => setSheet(false)} /> : null}
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
				</table>
			</div>
		</div>
	);
}
