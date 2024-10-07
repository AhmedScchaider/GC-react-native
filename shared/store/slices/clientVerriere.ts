import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getClientVerriere = createAsyncThunk('clientVerriere/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_VERRIERE);
	return response?.data;
});

export const addClientVerriere = createAsyncThunk('clientVerriere/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_VERRIERE, data);
	return response?.data;
});
export const deleteClientVerriere = createAsyncThunk('clientVerriere/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_VERRIERE, data?.ID);
	return data;
});

export const updateClientVerriere = createAsyncThunk('clientVerriere/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_VERRIERE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneClientVerriere = createAsyncThunk('clientVerriere/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.CLIENT_VERRIERE + "/" + data);
	return response?.data;
});

export const clientVerriereReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addClientVerriere.pending, state => {
			state.pending = true;
		})
		.addCase(addClientVerriere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addClientVerriere.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getClientVerriere.pending, state => {
			state.pending = true;
		})
		.addCase(getClientVerriere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getClientVerriere.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneClientVerriere.pending, state => {
			state.pending = true;
		})
		.addCase(getOneClientVerriere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneClientVerriere.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteClientVerriere.pending, state => {
			state.pending = true;
		})
		.addCase(deleteClientVerriere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteClientVerriere.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateClientVerriere.pending, state => {
			state.pending = true;
		})
		.addCase(updateClientVerriere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateClientVerriere.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default clientVerriereReducer;
