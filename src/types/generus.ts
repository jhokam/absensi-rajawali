import type { ResponseBase, ResponseBaseWithArray } from "./api";

type GenerusBase = {
	id: string;
	nama: string;
	jenis_kelamin: "Laki_Laki" | "Perempuan";
	tempat_lahir: string;
	tanggal_lahir: Date;
	jenjang: "Paud" | "Caberawit" | "Pra_Remaja" | "Remaja" | "Pra_Nikah";
	nomer_whatsapp?: string;
	pendidikan_terakhir:
		| "PAUD"
		| "TK"
		| "SD"
		| "SMP"
		| "SMA_SMK"
		| "D1_D3"
		| "S1_D4"
		| "S2"
		| "S3";
	nama_orang_tua?: string;
	nomer_whatsapp_orang_tua?: string;
	sambung: "Aktif" | "Tidak_Aktif";
	alamat_tempat_tinggal: string;
	keterangan: "Pendatang" | "Pribumi";
	alamat_asal?: string;
	kelompok_id?: string;
};

export type GenerusRequest = Omit<GenerusBase, "id">;

export type GenerusResponseArray = ResponseBaseWithArray<GenerusBase>;

export type GenerusResponse = ResponseBase<GenerusBase>;
