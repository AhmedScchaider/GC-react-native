import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getFamilleArticle = createAsyncThunk('familleArticle/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FAMILLE_ARTICLE);
	return response?.data;
});

export const addFamilleArticle = createAsyncThunk('familleArticle/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FAMILLE_ARTICLE, data);
	return response?.data;
});
export const deleteFamilleArticle = createAsyncThunk('familleArticle/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FAMILLE_ARTICLE, data?.ID);
	return data;
});

export const updateFamilleArticle = createAsyncThunk('familleArticle/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FAMILLE_ARTICLE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneFamilleArticle = createAsyncThunk('familleArticle/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.FAMILLE_ARTICLE + "/" + data);
	return response?.data;
});

export const familleArticleReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(addFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(getFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(getOneFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(deleteFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateFamilleArticle.pending, state => {
			state.pending = true;
		})
		.addCase(updateFamilleArticle.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateFamilleArticle.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default familleArticleReducer;


