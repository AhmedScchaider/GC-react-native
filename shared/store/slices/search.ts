import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { objectArrayAPIInitialState } from "../types";


export const resetSearch = createAsyncThunk('searchs/reset', () => {
	return "";
});
export const addSearch = createAsyncThunk('searchs/add', (data: string) => {
	return data;
});

export const searchsReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(resetSearch.pending, state => {
			state.pending = true;
		})
		.addCase(resetSearch.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(resetSearch.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(addSearch.pending, state => {
			state.pending = true;
		})
		.addCase(addSearch.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(addSearch.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default searchsReducer;

