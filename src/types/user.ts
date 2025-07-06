import type { ResponseBase, ResponseBaseWithArray } from "./api";
import z from "zod";

export type UserBase = {
	id: string;
	username: string;
	password: string;
	role: "Admin" | "User";
};

export type UserRequest = Omit<UserBase, "id">;

export type UserResponseArray = ResponseBaseWithArray<UserBase>;

export type UserResponse = ResponseBase<UserBase>;

export const userSchema = z.object({
	username: z.string().nonempty("Username tidak boleh kosong"),
	password: z.string().nonempty("Password tidak boleh kosong"),
	role: z.enum(["Admin", "User"], {
		required_error: "Role tidak boleh kosong",
	}),
});
