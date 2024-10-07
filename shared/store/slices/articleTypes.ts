import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { reduxConstants } from "../../constants/constants";
import generalService from "../../services/generalServise";
import { objectArrayAPIInitialState } from "../types";

export const getArticleType = createAsyncThunk('article_type/getMy', async () => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLES_TYPE);
	return response?.data;
});

export const addArticleType = createAsyncThunk('article_type/add', async (data: any) => {
	const response = await generalService.addGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLES_TYPE, data);
	return response?.data;
});
export const deleteArticleType = createAsyncThunk('article_type/delete', async (data: any) => {
	const response = await generalService.deleteGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLES_TYPE, data?.ID);
	return data;
});

export const updateArticleType = createAsyncThunk('article_type/update', async (data: any) => {
	const response = await generalService.updateGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLES_TYPE + '/' + data?.ID,{...data,ID:undefined});
	return response?.data;
});

export const getOneArticleType = createAsyncThunk('article_type/getOne', async (data: any) => {
	const response = await generalService.getGeneral(reduxConstants.MAIN_API_URL + reduxConstants.ARTICLES_TYPE + "/" + data);
	return response?.data;
});

export const articleTypesReducer = createReducer(objectArrayAPIInitialState, builder => {
	builder
		.addCase(addArticleType.pending, state => {
			state.pending = true;
		})
		.addCase(addArticleType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = [...state?.data, payload];
		})
		.addCase(addArticleType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(getArticleType.pending, state => {
			state.pending = true;
		})
		.addCase(getArticleType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getArticleType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(getOneArticleType.pending, state => {
			state.pending = true;
		})
		.addCase(getOneArticleType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = payload;
		})
		.addCase(getOneArticleType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
		.addCase(deleteArticleType.pending, state => {
			state.pending = true;
		})
		.addCase(deleteArticleType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.filter((oneObject: any) => oneObject.ID != payload.ID);
		})
		.addCase(deleteArticleType.rejected, state => {
			state.pending = false;
			state.error = true;
		})

		.addCase(updateArticleType.pending, state => {
			state.pending = true;
		})
		.addCase(updateArticleType.fulfilled, (state, { payload }) => {
			state.pending = false;
			state.data = state.data.map((oneObject: any) => oneObject.ID == payload.ID ? payload : oneObject);
		})
		.addCase(updateArticleType.rejected, state => {
			state.pending = false;
			state.error = true;
		})
});

export default articleTypesReducer;
