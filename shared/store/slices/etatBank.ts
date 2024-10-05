import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getEtatBank = createAsyncThunk('etat_bank/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ETAT_BANK);
	return response?.data;
});

export const addEtatBank = createAsyncThunk('etat_bank/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ETAT_BANK, data);
	return response?.data;
});
export const deleteEtatBank = createAsyncThunk('etat_bank/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ETAT_BANK, data?.ID);
	return data;
});

export const updateEtatBank = createAsyncThunk('etat_bank/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ETAT_BANK + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneEtatBank = createAsyncThunk('etat_bank/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ETAT_BANK + "/" + data);
	return response?.data;
});

export const etatBankReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addEtatBank.pending, state => {
			state.pending = true;
		})
		.addCase(addEtatBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addEtatBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getEtatBank.pending, state => {
			state.pending = true;
		})
		.addCase(getEtatBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getEtatBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneEtatBank.pending, state => {
			state.pending = true;
		})
		.addCase(getOneEtatBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneEtatBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteEtatBank.pending, state => {
			state.pending = true;
		})
		.addCase(deleteEtatBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteEtatBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateEtatBank.pending, state => {
			state.pending = true;
		})
		.addCase(updateEtatBank.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateEtatBank.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default etatBankReducer;


