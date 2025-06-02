export type LoginRequest = {
	username: string;
	password: string;
};

export type ErrorResponse = {
	message: string;
	error: string;
};

export type ResponseBase<T> = {
	success: boolean;
	message: string;
	error: ErrorResponse | null;
	data: T;
};

export type ResponseBaseWithArray<T> = {
	success: boolean;
	message: string;
	error: ErrorResponse | null;
	data: T[];
};

export type GenerusBase = {
	id: number;
	nama: string;
	username: string;
	jenis_kelamin: "Laki_Laki" | "Perempuan";
	jenjang: "Paud" | "Caberawit" | "Pra_Remaja" | "Remaja" | "Pra_Nikah";
	alamat: string;
	sambung: "Aktif" | "Tidak_Aktif" | string;
};

export type PublicGenerus = GenerusBase;

export type GenerusRequest = Omit<GenerusBase, "id">;

export type LoginBase = {
	access_token: string;
};

export type LoginResponse = ResponseBase<LoginBase>;

export type GenerusResponseArray = ResponseBaseWithArray<PublicGenerus>;

export type GenerusResponse = ResponseBase<PublicGenerus>;
