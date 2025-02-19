import { parse, serialize } from "cookie";

export function setCookie({
	name,
	value,
	days,
}: { name: string; value: string; days: number }) {
	serialize(name, value, {
		expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
		httpOnly: true,
		sameSite: "strict",
	});
}

export function getCookie({ name }: { name: string }) {
	return parse(document.cookie)[name];
}
