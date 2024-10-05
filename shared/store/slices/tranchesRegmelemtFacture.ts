import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getTranchesReglement = createAsyncThunk('tranches_reglement/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TRANCHES_REGMELEMT_FACTURE);
	return response?.data;
});

export const addTranchesReglement = createAsyncThunk('tranches_reglement/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TRANCHES_REGMELEMT_FACTURE, data);
	return response;
});
export const deleteTranchesReglement = createAsyncThunk('tranches_reglement/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TRANCHES_REGMELEMT_FACTURE, data?.ID);
	return data;
});

export const updateTranchesReglement = createAsyncThunk('tranches_reglement/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TRANCHES_REGMELEMT_FACTURE + '/' + data?.ID, { ...data,ID:undefined });
	return response?.data;
});

export const getOneTranchesReglement = createAsyncThunk('tranches_reglement/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.TRANCHES_REGMELEMT_FACTURE + "/" + data);
	return response?.data;
});

export const tranchesReglementFactureReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addTranchesReglement.pending, state => {
			state.pending = true;
		})
		.addCase(addTranchesReglement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addTranchesReglement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getTranchesReglement.pending, state => {
			state.pending = true;
		})
		.addCase(getTranchesReglement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getTranchesReglement.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneTranchesReglement.pending, state => {
			state.pending = true;
		})
		.addCase(getOneTranchesReglement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneTranchesReglement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteTranchesReglement.pending, state => {
			state.pending = true;
		})
		.addCase(deleteTranchesReglement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteTranchesReglement.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateTranchesReglement.pending, state => {
			state.pending = true;
		})
		.addCase(updateTranchesReglement.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateTranchesReglement.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default tranchesReglementFactureReducer;


