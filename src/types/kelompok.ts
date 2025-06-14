import type { ResponseBase, ResponseBaseWithArray } from "./api";

type KelompokBase = {
	id: string;
	nama: string;
	desa_id: number;
};

export type KelompokResponseArray = ResponseBaseWithArray<KelompokBase>;

export type KelompokResponse = ResponseBase<KelompokBase>;
