import type { ResponseBase, ResponseBaseWithArray } from "./api";
import z from "zod";

export type PresenceBase = {
	id: string;
	status: "Hadir" | "Izin" | "Tidak Hadir";
	event_id: string;
	generus_id: string;
};

export type PresenceRequest = Omit<PresenceBase, "id">;

export type PresenceResponseArray = ResponseBaseWithArray<PresenceBase>;

export type PresenceResponse = ResponseBase<PresenceBase>;

export const presenceSchema = z.object({
	status: z.enum(["Hadir", "Izin", "Tidak Hadir"], {
		required_error: "Status tidak boleh kosong",
	}),
	event_id: z.string().nonempty("Event tidak boleh kosong"),
	generus_id: z.string().nonempty("Generus tidak boleh kosong"),
});

