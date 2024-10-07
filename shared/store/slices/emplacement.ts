import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getEmplacement = createAsyncThunk('emplacement/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.EMPLACEMENT);
	return response?.data;
});

export const addEmplacement = createAsyncThunk('emplacements/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.EMPLACEMENT, data);
	return response?.data;
});
export const deleteEmplacement = createAsyncThunk('emplacements/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.EMPLACEMENT, data?.ID);
	return data;
});

export const updateEmplacement = createAsyncThunk('emplacements/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.EMPLACEMENT + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneEmplacement = createAsyncThunk('emplacements/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.EMPLACEMENT + "/" + data);
	return response?.data;
});

export const emplacementReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addEmplacement.pending, state => {
			state.pending = true;
		})
		.addCase(addEmplacement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addEmplacement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getEmplacement.pending, state => {
			state.pending = true;
		})
		.addCase(getEmplacement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getEmplacement.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneEmplacement.pending, state => {
			state.pending = true;
		})
		.addCase(getOneEmplacement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneEmplacement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteEmplacement.pending, state => {
			state.pending = true;
		})
		.addCase(deleteEmplacement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteEmplacement.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateEmplacement.pending, state => {
			state.pending = true;
		})
		.addCase(updateEmplacement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateEmplacement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default emplacementReducer;

