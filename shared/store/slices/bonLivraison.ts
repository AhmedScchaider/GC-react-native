import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getBonLivraison = createAsyncThunk('bon_livraison/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_LIVRAISON);
	return response?.data;
});

export const addBonLivraison = createAsyncThunk('bon_livraison/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_LIVRAISON, data);
	return response?.data;
});
export const deleteBonLivraison = createAsyncThunk('bon_livraison/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_LIVRAISON, data?.ID);
	return data;
});

export const updateBonLivraison = createAsyncThunk('bon_livraison/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_LIVRAISON + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneBonLivraison = createAsyncThunk('bon_livraison/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.BON_LIVRAISON + "/" + data);
	return response?.data;
});

export const bonLivraisonReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addBonLivraison.pending, state => {
			state.pending = true;
		})
		.addCase(addBonLivraison.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addBonLivraison.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getBonLivraison.pending, state => {
			state.pending = true;
		})
		.addCase(getBonLivraison.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getBonLivraison.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneBonLivraison.pending, state => {
			state.pending = true;
		})
		.addCase(getOneBonLivraison.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneBonLivraison.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteBonLivraison.pending, state => {
			state.pending = true;
		})
		.addCase(deleteBonLivraison.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteBonLivraison.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateBonLivraison.pending, state => {
			state.pending = true;
		})
		.addCase(updateBonLivraison.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateBonLivraison.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default bonLivraisonReducer;

