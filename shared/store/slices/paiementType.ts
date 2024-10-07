import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getPaiementType = createAsyncThunk('paiementType/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.PAIEMENT_TYPE);
	return response?.data;
});

export const addPaiementType = createAsyncThunk('paiementType/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.PAIEMENT_TYPE, data);
	return response?.data;
});
export const deletePaiementType = createAsyncThunk('paiementType/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.PAIEMENT_TYPE, data?.ID);
	return data;
});

export const updatePaiementType = createAsyncThunk('paiementType/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.PAIEMENT_TYPE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOnePaiementType = createAsyncThunk('paiementType/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.PAIEMENT_TYPE + "/" + data);
	return response?.data;
});

export const paiementTypeReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addPaiementType.pending, state => {
			state.pending = true;
		})
		.addCase(addPaiementType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addPaiementType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getPaiementType.pending, state => {
			state.pending = true;
		})
		.addCase(getPaiementType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getPaiementType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOnePaiementType.pending, state => {
			state.pending = true;
		})
		.addCase(getOnePaiementType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOnePaiementType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deletePaiementType.pending, state => {
			state.pending = true;
		})
		.addCase(deletePaiementType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deletePaiementType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updatePaiementType.pending, state => {
			state.pending = true;
		})
		.addCase(updatePaiementType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updatePaiementType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default paiementTypeReducer;

