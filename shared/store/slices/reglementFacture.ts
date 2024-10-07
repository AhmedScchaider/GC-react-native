import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getReglementFacture = createAsyncThunk('reglement_facture/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.REGLEMENT_FACTURE);
	return response?.data;
});

export const addReglementFacture = createAsyncThunk('reglement_facture/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.REGLEMENT_FACTURE, data);
	return response?.data;
});
export const deleteReglementFacture = createAsyncThunk('reglement_facture/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.REGLEMENT_FACTURE, data?.ID);
	return data;
});

export const updateReglementFacture = createAsyncThunk('reglement_facture/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.REGLEMENT_FACTURE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneReglementFacture = createAsyncThunk('reglement_facture/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.REGLEMENT_FACTURE + "/" + data);
	return response?.data;
});

export const reglementFactureReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(addReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(getReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(getOneReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(deleteReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(updateReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default reglementFactureReducer;


