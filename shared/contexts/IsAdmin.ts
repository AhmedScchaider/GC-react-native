import { createContext } from "react";

export type IsAdminContent = {
	isAdmin: boolean
	setIsAdmin: (c: boolean) => void
}
export const IsAdminContext = createContext<IsAdminContent>({
	isAdmin: false,
	setIsAdmin: () => []
});

