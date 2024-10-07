import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getFournisseur = createAsyncThunk('fournisseur/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR);
	return response?.data;
});

export const addFournisseur = createAsyncThunk('fournisseur/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR, data);
	return response?.data;
});
export const deleteFournisseur = createAsyncThunk('fournisseur/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR, data?.ID);
	return data;
});

export const updateFournisseur = createAsyncThunk('fournisseur/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneFournisseur = createAsyncThunk('fournisseur/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR + "/" + data);
	return response?.data;
});

export const fournisseurReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addFournisseur.pending, state => {
			state.pending = true;
		})
		.addCase(addFournisseur.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addFournisseur.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFournisseur.pending, state => {
			state.pending = true;
		})
		.addCase(getFournisseur.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFournisseur.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneFournisseur.pending, state => {
			state.pending = true;
		})
		.addCase(getOneFournisseur.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneFournisseur.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteFournisseur.pending, state => {
			state.pending = true;
		})
		.addCase(deleteFournisseur.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteFournisseur.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateFournisseur.pending, state => {
			state.pending = true;
		})
		.addCase(updateFournisseur.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateFournisseur.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default fournisseurReducer;


