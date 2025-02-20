import type { ReactNode } from "@tanstack/react-router";

export default function TextError({ children }: { children: ReactNode }) {
	return <p className="text-red-500">{children}</p>;
}
