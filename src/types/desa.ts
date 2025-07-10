import z from "zod";
import type { ResponseBase, ResponseBaseWithArray } from "./api";

export type DesaBase = {
	id: number;
	nama: string;
};

export const desaSchema = z.object({
	nama: z.string().nonempty("Nama tidak boleh kosong"),
});

export type DesaRequest = Omit<DesaBase, "id">;

export type DesaResponseArray = ResponseBaseWithArray<DesaBase>;

export type DesaResponse = ResponseBase<DesaBase>;
