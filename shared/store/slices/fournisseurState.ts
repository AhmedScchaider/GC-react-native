import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getFournisseurState = createAsyncThunk('fournisseurState/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR_STATE);
	return response?.data;
});

export const addFournisseurState = createAsyncThunk('fournisseurState/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR_STATE, data);
	return response?.data;
});
export const deleteFournisseurState = createAsyncThunk('fournisseurState/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR_STATE, data?.ID);
	return data;
});

export const updateFournisseurState = createAsyncThunk('fournisseurState/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR_STATE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneFournisseurState = createAsyncThunk('fournisseurState/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FOURNISSEUR_STATE + "/" + data);
	return response?.data;
});

export const fournisseurStateReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addFournisseurState.pending, state => {
			state.pending = true;
		})
		.addCase(addFournisseurState.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addFournisseurState.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFournisseurState.pending, state => {
			state.pending = true;
		})
		.addCase(getFournisseurState.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFournisseurState.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneFournisseurState.pending, state => {
			state.pending = true;
		})
		.addCase(getOneFournisseurState.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneFournisseurState.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteFournisseurState.pending, state => {
			state.pending = true;
		})
		.addCase(deleteFournisseurState.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteFournisseurState.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateFournisseurState.pending, state => {
			state.pending = true;
		})
		.addCase(updateFournisseurState.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateFournisseurState.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default fournisseurStateReducer;
