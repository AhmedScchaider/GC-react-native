import { createContext } from "react";

export type RowContent = {
	rows_: any[]
	setRows_: (c: any[]) => void
}
export const RowsContext = createContext<RowContent>({
	rows_: [],
	setRows_: () => []
});
