import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getInventaire = createAsyncThunk('inventaire/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVENTAIRES);
	return response?.data;
});

export const addInventaire = createAsyncThunk('inventaire/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVENTAIRES, data);
	return response?.data;
});
export const deleteInventaire = createAsyncThunk('inventaire/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVENTAIRES, data?.ID);
	return data;
});

export const updateInventaire = createAsyncThunk('inventaire/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVENTAIRES + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneInventaire = createAsyncThunk('inventaire/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.INVENTAIRES + "/" + data);
	return response?.data;
});

export const inventaireReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addInventaire.pending, state => {
			state.pending = true;
		})
		.addCase(addInventaire.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addInventaire.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getInventaire.pending, state => {
			state.pending = true;
		})
		.addCase(getInventaire.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getInventaire.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneInventaire.pending, state => {
			state.pending = true;
		})
		.addCase(getOneInventaire.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneInventaire.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteInventaire.pending, state => {
			state.pending = true;
		})
		.addCase(deleteInventaire.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteInventaire.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateInventaire.pending, state => {
			state.pending = true;
		})
		.addCase(updateInventaire.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateInventaire.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default inventaireReducer;

