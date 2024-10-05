import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getFactureAvoir = createAsyncThunk('factureAvoir/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE_AVOIR);
	return response?.data;
});

export const addFactureAvoir = createAsyncThunk('factureAvoir/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE_AVOIR, data);
	return response?.data;
});
export const deleteFactureAvoir = createAsyncThunk('factureAvoir/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE_AVOIR, data?.ID);
	return data;
});

export const updateFactureAvoir = createAsyncThunk('factureAvoir/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE_AVOIR + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneFactureAvoir = createAsyncThunk('factureAvoir/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FACTURE_AVOIR + "/" + data);
	return response?.data;
});

export const factureAvoirReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addFactureAvoir.pending, state => {
			state.pending = true;
		})
		.addCase(addFactureAvoir.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addFactureAvoir.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFactureAvoir.pending, state => {
			state.pending = true;
		})
		.addCase(getFactureAvoir.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFactureAvoir.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneFactureAvoir.pending, state => {
			state.pending = true;
		})
		.addCase(getOneFactureAvoir.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneFactureAvoir.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteFactureAvoir.pending, state => {
			state.pending = true;
		})
		.addCase(deleteFactureAvoir.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteFactureAvoir.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateFactureAvoir.pending, state => {
			state.pending = true;
		})
		.addCase(updateFactureAvoir.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateFactureAvoir.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default factureAvoirReducer;


