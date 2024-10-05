import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";



export const getRestorentPlateOptionInput = createAsyncThunk('restorentPlateOptionInput/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.RESTORENT_PLATE_OPTION_INPUT);
	return response?.data;
});

export const deleteRestorentPlateOptionInput = createAsyncThunk('restorentPlateOptionInput/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.RESTORENT_PLATE_OPTION_INPUT, data?.ID);
	return data;
});

export const updateRestorentPlateOptionInput = createAsyncThunk('restorentPlateOptionInput/update', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.RESTORENT_PLATE_OPTION_INPUT + '/' + data?.ID, { ...data, ID: undefined });
	return response?.data;
});


export const restorentPlateOptionInputReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(getRestorentPlateOptionInput.pending, state => {
			state.pending = true;
		})
		.addCase(getRestorentPlateOptionInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getRestorentPlateOptionInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteRestorentPlateOptionInput.pending, state => {
			state.pending = true;
		})
		.addCase(deleteRestorentPlateOptionInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteRestorentPlateOptionInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateRestorentPlateOptionInput.pending, state => {
			state.pending = true;
		})
		.addCase(updateRestorentPlateOptionInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateRestorentPlateOptionInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default restorentPlateOptionInputReducer;
