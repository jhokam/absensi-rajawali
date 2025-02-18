import * as cookie from "cookie";

export function setCookie({
	name,
	value,
	days,
}: { name: string; value: string; days: number }) {
	cookie.serialize(name, value, {
		expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
		httpOnly: true,
		sameSite: "strict",
	});
}
