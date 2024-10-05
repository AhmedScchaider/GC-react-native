import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getArticlesMatierePremiere = createAsyncThunk('articleMatierePremiere/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE);
	return response?.data;
});

export const addArticlesMatierePremiere = createAsyncThunk('articleMatierePremiere/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE, data);
	return response?.data;
});
export const deleteArticlesMatierePremiere = createAsyncThunk('articleMatierePremiere/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE, data?.ID);
	return data;
});

export const updateArticlesMatierePremiere = createAsyncThunk('articleMatierePremiere/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneArticlesMatierePremiere = createAsyncThunk('articleMatierePremiere/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE + "/" + data);
	return response?.data;
});

export const articleMatierePremiereReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addArticlesMatierePremiere.pending, state => {
			state.pending = true;
		})
		.addCase(addArticlesMatierePremiere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addArticlesMatierePremiere.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getArticlesMatierePremiere.pending, state => {
			state.pending = true;
		})
		.addCase(getArticlesMatierePremiere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getArticlesMatierePremiere.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneArticlesMatierePremiere.pending, state => {
			state.pending = true;
		})
		.addCase(getOneArticlesMatierePremiere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.oneObject = payload;
		})
		.addCase(getOneArticlesMatierePremiere.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteArticlesMatierePremiere.pending, state => {
			state.pending = true;
		})
		.addCase(deleteArticlesMatierePremiere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteArticlesMatierePremiere.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateArticlesMatierePremiere.pending, state => {
			state.pending = true;
		})
		.addCase(updateArticlesMatierePremiere.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateArticlesMatierePremiere.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default articleMatierePremiereReducer;


