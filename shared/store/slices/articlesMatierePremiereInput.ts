import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getArticlesMatierePremiereInput = createAsyncThunk('articleMatierePremiereInput/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE_INPUT);
	return response?.data;
});

export const addArticlesMatierePremiereInput = createAsyncThunk('articleMatierePremiereInput/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE_INPUT, data);
	return response?.data;
});
export const deleteArticlesMatierePremiereInput = createAsyncThunk('articleMatierePremiereInput/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE_INPUT, data?.ID);
	return data;
});

export const updateArticlesMatierePremiereInput = createAsyncThunk('articleMatierePremiereInput/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE_INPUT + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneArticlesMatierePremiereInput = createAsyncThunk('articleMatierePremiereInput/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLE_MATIERE_PREMIERE_INPUT + "/" + data);
	return response?.data;
});

export const articleMatierePremiereInputReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addArticlesMatierePremiereInput.pending, state => {
			state.pending = true;
		})
		.addCase(addArticlesMatierePremiereInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state.data, payload];
		})
		.addCase(addArticlesMatierePremiereInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getArticlesMatierePremiereInput.pending, state => {
			state.pending = true;
		})
		.addCase(getArticlesMatierePremiereInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getArticlesMatierePremiereInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneArticlesMatierePremiereInput.pending, state => {
			state.pending = true;
		})
		.addCase(getOneArticlesMatierePremiereInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneArticlesMatierePremiereInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteArticlesMatierePremiereInput.pending, state => {
			state.pending = true;
		})
		.addCase(deleteArticlesMatierePremiereInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteArticlesMatierePremiereInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateArticlesMatierePremiereInput.pending, state => {
			state.pending = true;
		})
		.addCase(updateArticlesMatierePremiereInput.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateArticlesMatierePremiereInput.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default articleMatierePremiereInputReducer;


