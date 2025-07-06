import type { ResponseBase, ResponseBaseWithArray } from "./api";
import z from "zod";

export type KelompokBase = {
	id: string;
	nama: string;
	desa_id: number;
};

export type KelompokResponseArray = ResponseBaseWithArray<KelompokBase>;

export type KelompokResponse = ResponseBase<KelompokBase>;

export const kelompokSchema = z.object({
	nama: z.string().nonempty("Nama tidak boleh kosong"),
	desa_id: z.number().nonempty("Desa tidak boleh kosong"),
});
