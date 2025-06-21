import type { ResponseBase, ResponseBaseWithArray } from "./api";

export type DesaBase = {
	id: number;
	nama: string;
};

export type DesaResponseArray = ResponseBaseWithArray<DesaBase>;

export type DesaResponse = ResponseBase<DesaBase>;
