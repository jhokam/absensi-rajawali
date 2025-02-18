export type LoginRequest = {
	username: string;
	password: string;
};

export type ResponseBase<T> = {
	success: boolean;
	message: string;
	errors: any | null;
	data: T;
};

export type ResponseBaseWithArray<T> = {
	success: boolean;
	message: string;
	errors: any | null;
	data: T[];
};

export type RemajaBase = {
	id: number;
	createAt: string;
	updatedAt: number;
	nama: string;
	username: string;
	jenis_kelamin: "LAKI_LAKI" | "PEREMPUAN";
	jenjang: "PAUD" | "CABERAWIT" | "PRA_REMAJA" | "REMAJA" | "PRA_NIKAH";
	alamat: string;
	sambung: boolean;
	role: "ADMIN" | "USER";
	password: string;
};

export type LoginBase = {
	access_token: string;
};

export type LoginResponse = ResponseBase<LoginBase>;

export type RemajaResponse = ResponseBaseWithArray<RemajaBase>;
