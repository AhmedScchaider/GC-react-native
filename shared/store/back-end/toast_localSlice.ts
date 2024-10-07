import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { objectAPIInitialState } from "../types";



export const closeToast = createAsyncThunk('toastClose/get', async () => {
	return { open: false, message: "" };
});
export const openToast = createAsyncThunk('toastOpen/get', async (data: any) => {
	return { open: true, ...data };
});

export const toastReducer = createReducer(objectAPIInitialState, builder => {
	builder
		.addCase(closeToast.pending, state => {
			state.pending = true;
		})
		.addCase(closeToast.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(closeToast.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(openToast.pending, state => {
			state.pending = true;
		})
		.addCase(openToast.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(openToast.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default toastReducer;

