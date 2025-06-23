import type { ResponseBase, ResponseBaseWithArray } from "./api";

export type UserBase = {
	id: string;
	username: string;
	password: string;
	role: "Admin" | "User";
};

export type UserRequest = Omit<UserBase, "id">;

export type UserResponseArray = ResponseBaseWithArray<UserBase>;

export type UserResponse = ResponseBase<UserBase>;
