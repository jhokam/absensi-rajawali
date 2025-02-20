import { type ReactNode, createContext, useContext, useState } from "react";

type UserContextType = {
	role: string | null;
	setRole: (role: string) => void;
};

const profileContext = createContext<UserContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
	const [role, setRole] = useState<string | null>(null);

	return (
		<profileContext.Provider value={{ role, setRole }}>
			{children}
		</profileContext.Provider>
	);
}

export function useProfile() {
	const context = useContext(profileContext);
	if (context === undefined) {
		throw new Error("useProfile must be used within a UserProvider");
	}
	return context;
}
