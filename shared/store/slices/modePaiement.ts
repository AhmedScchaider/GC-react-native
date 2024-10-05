import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getModePaiement = createAsyncThunk('mode_paiement/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.MODE_PAIEMENTS);
	return response?.data;
});

export const addModePaiement = createAsyncThunk('mode_paiement/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.MODE_PAIEMENTS, data);
	return response?.data;
});
export const deleteModePaiement = createAsyncThunk('mode_paiement/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.MODE_PAIEMENTS, data?.ID);
	return data;
});

export const updateModePaiement = createAsyncThunk('mode_paiement/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.MODE_PAIEMENTS + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneModePaiement = createAsyncThunk('mode_paiement/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.MODE_PAIEMENTS + "/" + data);
	return response?.data;
});

export const modePaiementReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addModePaiement.pending, state => {
			state.pending = true;
		})
		.addCase(addModePaiement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addModePaiement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getModePaiement.pending, state => {
			state.pending = true;
		})
		.addCase(getModePaiement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getModePaiement.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneModePaiement.pending, state => {
			state.pending = true;
		})
		.addCase(getOneModePaiement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneModePaiement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteModePaiement.pending, state => {
			state.pending = true;
		})
		.addCase(deleteModePaiement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteModePaiement.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateModePaiement.pending, state => {
			state.pending = true;
		})
		.addCase(updateModePaiement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateModePaiement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default modePaiementReducer;


