import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const gettypeReglementFacture = createAsyncThunk('typeReglementFacture/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TYPE_REGLEMENT_FACTURE);
	return response?.data;
});

export const addtypeReglementFacture = createAsyncThunk('typeReglementFacture/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TYPE_REGLEMENT_FACTURE, data);
	return response?.data;
});
export const deletetypeReglementFacture = createAsyncThunk('typeReglementFacture/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TYPE_REGLEMENT_FACTURE, data?.ID);
	return data;
});

export const updatetypeReglementFacture = createAsyncThunk('typeReglementFacture/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TYPE_REGLEMENT_FACTURE + '/' + data?.ID, { ...data,ID:undefined });
	return response?.data;
});

export const getOnetypeReglementFacture = createAsyncThunk('typeReglementFacture/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TYPE_REGLEMENT_FACTURE + "/" + data);
	return response?.data;
});

export const typeReglementFacturesReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addtypeReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(addtypeReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addtypeReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(gettypeReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(gettypeReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(gettypeReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOnetypeReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(getOnetypeReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOnetypeReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deletetypeReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(deletetypeReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deletetypeReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updatetypeReglementFacture.pending, state => {
			state.pending = true;
		})
		.addCase(updatetypeReglementFacture.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updatetypeReglementFacture.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default typeReglementFacturesReducer;


