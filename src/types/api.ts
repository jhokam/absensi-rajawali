import type { ReactNode } from "@tanstack/react-router";

export type LoginRequest = {
	username: string;
	password: string;
};

export type ResponseBase<T> = {
	success: boolean;
	message: string;
	errors: any | null;
	data: T | ReactNode;
};

export type ResponseBaseWithArray<T> = {
	success: boolean;
	message: string;
	errors: any | null;
	data: T[];
};

export type RemajaBase = {
	id: number;
	nama: string;
	username: string;
	jenis_kelamin: "Laki_Laki" | "Perempuan";
	jenjang:
		| "Paud"
		| "Caberawit"
		| "Pra_Remaja"
		| "Remaja"
		| "Pra_Nikah"
		| string;
	alamat: string;
	sambung: "Aktif" | "Tidak_Aktif" | string;
	role: "Admin" | "User" | string;
};

export type LoginBase = {
	access_token: string;
};

export type LoginResponse = ResponseBase<LoginBase>;

export type RemajaResponse = ResponseBaseWithArray<RemajaBase>;

export type ProfileResponse = ResponseBase<RemajaBase>;

export type RemajaRequest = {
	nama: string;
	username: string;
	jenis_kelamin: "Laki-Laki" | "Perempuan" | string;
	jenjang:
		| "Paud"
		| "Caberawit"
		| "Pra_Remaja"
		| "Remaja"
		| "Pra_Nikah"
		| string;
	alamat: string;
	sambung: "Aktif" | "Tidak_Aktif" | string;
	role: "Admin" | "User" | string;
	password: string;
};
