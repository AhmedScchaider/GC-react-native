import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const clearGeneralLigne = createAsyncThunk('generalLigne/clear', async () => {
	return [];
});
export const getGeneralLigne = createAsyncThunk('generalLigne/getMy', async (endPoint: string) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + endPoint);
	return response?.data;
});

export const addGeneralLigne = createAsyncThunk('generalLigne/add', async (endPoint: string, data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + endPoint, data);
	return response?.data;
});
export const deleteGeneralLigne = createAsyncThunk('generalLigne/delete', async (endPoint: string, data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + endPoint, data?.ID);
	return data;
});

export const updateGeneralLigne = createAsyncThunk('generalLigne/update', async (endPoint: string, data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + endPoint + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneGeneralLigne = createAsyncThunk('generalLigne/getOne', async (endPoint: string, data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + endPoint + "/" + data);
	return response?.data;
});

export const generalLigneReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(clearGeneralLigne.pending, state => {
			state.pending = true;
		})
		.addCase(clearGeneralLigne.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(clearGeneralLigne.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(addGeneralLigne.pending, state => {
			state.pending = true;
		})
		.addCase(addGeneralLigne.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addGeneralLigne.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getGeneralLigne.pending, state => {
			state.pending = true;
		})
		.addCase(getGeneralLigne.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getGeneralLigne.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneGeneralLigne.pending, state => {
			state.pending = true;
		})
		.addCase(getOneGeneralLigne.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneGeneralLigne.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteGeneralLigne.pending, state => {
			state.pending = true;
		})
		.addCase(deleteGeneralLigne.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteGeneralLigne.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateGeneralLigne.pending, state => {
			state.pending = true;
		})
		.addCase(updateGeneralLigne.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateGeneralLigne.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default generalLigneReducer;


