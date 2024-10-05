import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getSousFamilleArticle = createAsyncThunk('sousFamilleArticle/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SOUS_FAMILLE_ARTICLE);
	return response?.data;
});

export const addSousFamilleArticle = createAsyncThunk('sousFamilleArticle/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SOUS_FAMILLE_ARTICLE, data);
	return response?.data;
});
export const deleteSousFamilleArticle = createAsyncThunk('sousFamilleArticle/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SOUS_FAMILLE_ARTICLE, data?.ID);
	return data;
});

export const updateSousFamilleArticle = createAsyncThunk('sousFamilleArticle/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SOUS_FAMILLE_ARTICLE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneSousFamilleArticle = createAsyncThunk('sousFamilleArticle/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.SOUS_FAMILLE_ARTICLE + "/" + data);
	return response?.data;
});

export const sousFamilleArticleReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addSousFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(addSousFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addSousFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getSousFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(getSousFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getSousFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneSousFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(getOneSousFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneSousFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteSousFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(deleteSousFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteSousFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateSousFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(updateSousFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateSousFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default sousFamilleArticleReducer;



