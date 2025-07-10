import z from "zod";

export const loginSchema = z.object({
	username: z.string().nonempty("Username tidak boleh kosong"),
	password: z.string().nonempty("Password tidak boleh kosong"),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export type ErrorResponse = {
	name: string;
	message: string;
};

export type ResponseBase<T> = {
	success: boolean;
	message: string;
	data: T;
	error: ErrorResponse | null;
};

export type ResponseBaseWithArray<T> = {
	success: boolean;
	message: string;
	error: ErrorResponse | null;
	data: T[];
};

export type LoginBase = {
	access_token: string;
};

export type LoginResponse = ResponseBase<LoginBase>;
