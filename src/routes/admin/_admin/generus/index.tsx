import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import SearchBar from "@/components/SearchBar";
import SheetFilter from "@/components/SheetFilter";
import Skeleton from "@/components/Skeleton";
import ThemedLink from "@/components/ThemedLink";
import ThemedSelect from "@/components/ThemedSelect";
import {
	jenisKelaminOptions,
	jenjangOptions,
	keteranganOptions,
	pendidikanTerakhirOptions,
	sambungOptions,
} from "@/constants/generus";
import type { GenerusBase, GenerusResponse } from "@/types/generus";
import { api } from "@/utils/api";
import { useGenerus } from "@/utils/fetch/useGenerus";
import { useAlert } from "@/utils/useAlert";

export const Route = createFileRoute("/admin/_admin/generus/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const [dialog, setDialog] = useState(false);
	const [sheetFilter, setSheetFilter] = useState(false);
	const [deleteId, setDeleteId] = useState("");
	const queryClient = useQueryClient();
	const [searchValue, setSearchValue] = useQueryState("q", {
		defaultValue: "",
		throttleMs: 2000,
	});
	const [jenisKelaminParam, setJenisKelaminParam] = useQueryState(
		"jenis_kelamin",
		{
			defaultValue: "",
		},
	);
	const [jenjangParam, setJenjangParam] = useQueryState("jenjang", {
		defaultValue: "",
	});
	const [pendidikanTerakhirParam, setPendidikanTerakhirParam] = useQueryState(
		"pendidikan_terakhir",
		{
			defaultValue: "",
		},
	);
	const [sambungParam, setSambungParam] = useQueryState("sambung", {
		defaultValue: "",
	});
	const [keteranganParam, setKeteranganParam] = useQueryState("keterangan", {
		defaultValue: "",
	});
	const [debouncedSearch] = useDebounce(searchValue, 2000);
	const { setAlert } = useAlert();
	const params = new URLSearchParams({
		q: debouncedSearch,
		jenis_kelamin: jenisKelaminParam,
		jenjang: jenjangParam,
		pendidikan_terakhir: pendidikanTerakhirParam,
		sambung: sambungParam,
		keterangan: keteranganParam,
	});

	const mutation = useMutation({
		mutationFn: (id: string) => api(`/generus/${id}`, { method: `DELETE` }),
		onSuccess: (success: GenerusResponse) => {
			queryClient.invalidateQueries({ queryKey: ["generusData"] });
			setAlert(success.message, "success");
		},
		onError: (error) => {
			setAlert(error.message, "error");
		},
	});

	const columnHelper = createColumnHelper<GenerusBase>();

	const handleDeleteConfirm = () => {
		mutation.mutate(deleteId);
		setDialog(false);
		setDeleteId("");
	};

	const handleDelete = (row: GenerusBase) => {
		setDeleteId(row.id);
		setDialog(true);
	};

	const { data, isPending, isError, error } = useGenerus(
		debouncedSearch,
		jenisKelaminParam,
		jenjangParam,
		pendidikanTerakhirParam,
		sambungParam,
		keteranganParam,
	);

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
						<button
							type="button"
							onClick={() => {
								return navigate({ to: `/admin/generus/update/${row.id}` });
							}}>
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

	useEffect(() => {
		if (isError) {
			setAlert(
				error.response?.data.message || "Internal Server Error",
				"error",
			);
		}
	}, [isError, error]);

	// const handleFilter = (value) => {
	// 	setJenisKelaminParam(value.value);
	// 	setJenjangParam(value.value);
	// 	setPendidikanTerakhirParam(value.value);
	// 	setSambungParam(value.value);
	// 	setKeteranganParam(value.value);
	// 	setSheetFilter(false);
	// };

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
			{sheetFilter && (
				<SheetFilter
					closeSheet={() => setSheetFilter(false)}
					submitFilter={() => setSheetFilter(false)}>
					<ThemedSelect
						name="jenis_kelamin"
						label="Jenis Kelamin"
						options={jenisKelaminOptions}
						placeholder="Pilih Jenis Kelamin"
						value={jenisKelaminParam}
						onChange={(e) => setJenisKelaminParam(e.target.value)}
					/>
					<ThemedSelect
						name="jenjang"
						label="Jenjang"
						options={jenjangOptions}
						placeholder="Pilih Jenjang"
						value={jenjangParam}
						onChange={(e) => setJenjangParam(e.target.value)}
					/>
					<ThemedSelect
						name="pendidikan_terakhir"
						label="Pendidikan Terakhir"
						options={pendidikanTerakhirOptions}
						placeholder="Pilih Pendidikan Terakhir"
						value={pendidikanTerakhirParam}
						onChange={(e) => setPendidikanTerakhirParam(e.target.value)}
					/>
					<ThemedSelect
						name="sambung"
						label="Sambung"
						options={sambungOptions}
						placeholder="Pilih Sambung"
						value={sambungParam}
						onChange={(e) => setSambungParam(e.target.value)}
					/>
					<ThemedSelect
						name="keterangan"
						label="Keterangan"
						options={keteranganOptions}
						placeholder="Pilih Keterangan"
						value={keteranganParam}
						onChange={(e) => setKeteranganParam(e.target.value)}
					/>
				</SheetFilter>
			)}
			<div className="flex justify-between">
				<SearchBar
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder="Search by Name"
					value={searchValue}
				/>
				<Button onClick={() => setSheetFilter(true)}>Filter</Button>
				<ThemedLink to="/admin/generus/create">Create Generus</ThemedLink>
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
