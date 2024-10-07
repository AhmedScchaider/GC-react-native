import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getNationality = createAsyncThunk('nationality/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY);
	return response?.data;
});

export const addNationality = createAsyncThunk('nationality/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY, data);
	return response?.data;
});
export const deleteNationality = createAsyncThunk('nationality/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY, data?.ID);
	return data;
});

export const updateNationality = createAsyncThunk('nationality/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneNationality = createAsyncThunk('nationality/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.NATIONALITY + "/" + data);
	return response?.data;
});

export const nationalityReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addNationality.pending, state => {
			state.pending = true;
		})
		.addCase(addNationality.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addNationality.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getNationality.pending, state => {
			state.pending = true;
		})
		.addCase(getNationality.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getNationality.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneNationality.pending, state => {
			state.pending = true;
		})
		.addCase(getOneNationality.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneNationality.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteNationality.pending, state => {
			state.pending = true;
		})
		.addCase(deleteNationality.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteNationality.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateNationality.pending, state => {
			state.pending = true;
		})
		.addCase(updateNationality.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateNationality.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default nationalityReducer;

