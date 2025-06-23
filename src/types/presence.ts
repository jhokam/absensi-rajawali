import type { ResponseBase, ResponseBaseWithArray } from "./api";

export type PresenceBase = {
	id: string;
	status: "Hadir" | "Izin" | "Tidak Hadir";
	event_id: string;
	generus_id: string;
};

export type PresenceRequest = Omit<PresenceBase, "id">;

export type PresenceResponseArray = ResponseBaseWithArray<PresenceBase>;

export type PresenceResponse = ResponseBase<PresenceBase>;
