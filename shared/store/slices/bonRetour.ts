import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getBonRetour = createAsyncThunk('BonRetour/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_RETOUR);
	return response?.data;
});

export const addBonRetour = createAsyncThunk('BonRetours/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_RETOUR, data);
	return response?.data;
});
export const deleteBonRetour = createAsyncThunk('BonRetours/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_RETOUR, data?.ID);
	return data;
});

export const updateBonRetour = createAsyncThunk('BonRetours/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_RETOUR + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneBonRetour = createAsyncThunk('BonRetours/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_RETOUR + "/" + data);
	return response?.data;
});

export const BonRetoursReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addBonRetour.pending, state => {
			state.pending = true;
		})
		.addCase(addBonRetour.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addBonRetour.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getBonRetour.pending, state => {
			state.pending = true;
		})
		.addCase(getBonRetour.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getBonRetour.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneBonRetour.pending, state => {
			state.pending = true;
		})
		.addCase(getOneBonRetour.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneBonRetour.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteBonRetour.pending, state => {
			state.pending = true;
		})
		.addCase(deleteBonRetour.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteBonRetour.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateBonRetour.pending, state => {
			state.pending = true;
		})
		.addCase(updateBonRetour.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateBonRetour.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default BonRetoursReducer;

