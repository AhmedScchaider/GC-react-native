import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getDepences = createAsyncThunk('depences/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEPENCES);
	return response?.data;
});

export const addDepences = createAsyncThunk('depences/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEPENCES, data);
	return response?.data;
});
export const deleteDepences = createAsyncThunk('depences/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEPENCES, data?.ID);
	return data;
});

export const updateDepences = createAsyncThunk('depences/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEPENCES + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneDepences = createAsyncThunk('depences/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEPENCES + "/" + data);
	return response?.data;
});

export const depencesReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addDepences.pending, state => {
			state.pending = true;
		})
		.addCase(addDepences.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addDepences.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getDepences.pending, state => {
			state.pending = true;
		})
		.addCase(getDepences.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getDepences.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneDepences.pending, state => {
			state.pending = true;
		})
		.addCase(getOneDepences.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneDepences.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteDepences.pending, state => {
			state.pending = true;
		})
		.addCase(deleteDepences.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteDepences.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateDepences.pending, state => {
			state.pending = true;
		})
		.addCase(updateDepences.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateDepences.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default depencesReducer;


