export const jenjangOptions = [
	{ value: "Paud", label: "Paud" },
	{ value: "Caberawit", label: "Caberawit" },
	{ value: "Pra_Remaja", label: "Pra Remaja" },
	{ value: "Remaja", label: "Remaja" },
	{ value: "Pra_Nikah", label: "Pra Nikah" },
];

export const jenisKelaminOptions = [
	{ value: "Laki_Laki", label: "Laki-Laki" },
	{ value: "Perempuan", label: "Perempuan" },
];

export const roleOptions = [
	{ value: "Admin", label: "Admin" },
	{ value: "User", label: "User" },
];

export const sambungOptions = [
	{ value: "Aktif", label: "Aktif" },
	{ value: "Tidak_Aktif", label: "Tidak Aktif" },
];

export const colorMap = {
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

export const SIDEBAR_MENU = [
	{
		title: "Dashboard",
		link: "/admin/dashboard",
	},
	{
		title: "Desa",
		link: "/admin/desa",
	},
	{
		title: "Generus",
		link: "/admin/generus",
	},
	{
		title: "Kegiatan",
		link: "/admin/kegiatan",
	},
];
