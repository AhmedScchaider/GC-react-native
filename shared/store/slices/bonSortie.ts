import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getBonSortie = createAsyncThunk('bonSortie/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_SORTIE);
	return response?.data;
});

export const addBonSortie = createAsyncThunk('bonSortie/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_SORTIE, data);
	return response?.data;
});
export const deleteBonSortie = createAsyncThunk('bonSortie/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_SORTIE, data?.ID);
	return data;
});

export const updateBonSortie = createAsyncThunk('bonSortie/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_SORTIE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneBonSortie = createAsyncThunk('bonSortie/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_SORTIE + "/" + data);
	return response?.data;
});

export const bonSortieReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addBonSortie.pending, state => {
			state.pending = true;
		})
		.addCase(addBonSortie.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addBonSortie.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getBonSortie.pending, state => {
			state.pending = true;
		})
		.addCase(getBonSortie.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getBonSortie.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneBonSortie.pending, state => {
			state.pending = true;
		})
		.addCase(getOneBonSortie.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneBonSortie.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteBonSortie.pending, state => {
			state.pending = true;
		})
		.addCase(deleteBonSortie.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteBonSortie.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateBonSortie.pending, state => {
			state.pending = true;
		})
		.addCase(updateBonSortie.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateBonSortie.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default bonSortieReducer;

