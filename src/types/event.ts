import type { ResponseBase, ResponseBaseWithArray } from "./api";

export type EventBase = {
	id: string;
	title: string;
	start_date: Date;
	end_date: Date;
	latitude: number;
	longitude: number;
	description?: string;
};

export type EventRequest = Omit<EventBase, "id">;

export type EventResponseArray = ResponseBaseWithArray<EventBase>;

export type EventResponse = ResponseBase<EventBase>;
