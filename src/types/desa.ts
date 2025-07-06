import type { ResponseBase, ResponseBaseWithArray } from "./api";
import z from "zod";

export type DesaBase = {
	id: number;
	nama: string;
};

export type DesaResponseArray = ResponseBaseWithArray<DesaBase>;

export type DesaResponse = ResponseBase<DesaBase>;

export const desaSchema = z.object({
	nama: z.string().nonempty("Nama tidak boleh kosong"),
});
