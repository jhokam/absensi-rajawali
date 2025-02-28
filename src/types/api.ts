export type LoginRequest = {
	username: string;
	password: string;
};

export type ErrorResponse = {
	response: {
		message: string;
		error: string;
		statusCode: number;
	};
	status: number;
	options: Record<never, never>;
	message: string;
	name: string;
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

export type RemajaBase = {
	id: number;
	nama: string;
	username: string;
	jenis_kelamin: "Laki_Laki" | "Perempuan";
	jenjang: "Paud" | "Caberawit" | "Pra_Remaja" | "Remaja" | "Pra_Nikah";
	alamat: string;
	sambung: "Aktif" | "Tidak_Aktif" | string;
	role: "Admin" | "User";
	password: string;
};

export type PublicRemaja = Omit<RemajaBase, "password">;

export type RemajaRequest = Omit<RemajaBase, "id">;

export type LoginBase = {
	access_token: string;
};

export type LoginResponse = ResponseBase<LoginBase>;

export type RemajaResponseArray = ResponseBaseWithArray<PublicRemaja>;

export type RemajaResponse = ResponseBase<PublicRemaja>;
