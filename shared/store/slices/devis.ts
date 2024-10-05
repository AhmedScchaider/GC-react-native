import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getDevis = createAsyncThunk('devis/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEVIS);
	return response?.data;
});

export const addDevis = createAsyncThunk('devis/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEVIS, data);
	return response?.data;
});
export const deleteDevis = createAsyncThunk('devis/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEVIS, data?.ID);
	return data;
});

export const updateDevis = createAsyncThunk('devis/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEVIS + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneDevis = createAsyncThunk('devis/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.DEVIS + "/" + data);
	return response?.data;
});

export const devisReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addDevis.pending, state => {
			state.pending = true;
		})
		.addCase(addDevis.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addDevis.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getDevis.pending, state => {
			state.pending = true;
		})
		.addCase(getDevis.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getDevis.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneDevis.pending, state => {
			state.pending = true;
		})
		.addCase(getOneDevis.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneDevis.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteDevis.pending, state => {
			state.pending = true;
		})
		.addCase(deleteDevis.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteDevis.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateDevis.pending, state => {
			state.pending = true;
		})
		.addCase(updateDevis.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateDevis.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default devisReducer;

