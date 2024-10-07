import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getBonEntrais = createAsyncThunk('bon_entrais/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_ENTRAIS);
	return response?.data;
});

export const addBonEntrais = createAsyncThunk('bon_entrais/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_ENTRAIS, data);
	return response?.data;
});
export const deleteBonEntrais = createAsyncThunk('bon_entrais/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_ENTRAIS, data?.ID);
	return data;
});

export const updateBonEntrais = createAsyncThunk('bon_entrais/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_ENTRAIS + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneBonEntrais = createAsyncThunk('bon_entrais/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_ENTRAIS + "/" + data);
	return response?.data;
});

export const bonEntraitReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addBonEntrais.pending, state => {
			state.pending = true;
		})
		.addCase(addBonEntrais.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addBonEntrais.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getBonEntrais.pending, state => {
			state.pending = true;
		})
		.addCase(getBonEntrais.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getBonEntrais.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneBonEntrais.pending, state => {
			state.pending = true;
		})
		.addCase(getOneBonEntrais.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneBonEntrais.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteBonEntrais.pending, state => {
			state.pending = true;
		})
		.addCase(deleteBonEntrais.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteBonEntrais.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateBonEntrais.pending, state => {
			state.pending = true;
		})
		.addCase(updateBonEntrais.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateBonEntrais.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default bonEntraitReducer;


